const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const app = express();

// Body parser
app.use(bodyParser.json());

// CORS
app.use(cors({
    origin: "http://127.0.0.1:5500",
    credentials: true
}));

// Session
app.use(session({
    secret: "luciano13",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, sameSite: "lax" }
}));

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Conexión a MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1306",
    database: "bake"
});

db.connect(err => {
    if (err) throw err;
    console.log("Conectado a MySQL ✅");
});

// Nodemailer global
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "bakevalentine.contacto@gmail.com",
        pass: "xmjqnoednsusefxq" // contraseña de aplicación
    }
});

// Registro 
app.post("/register", async (req, res) => {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) return res.status(400).json({ error: "Faltan datos" });

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)",
        [nombre, email, hashedPassword],
        (err) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") return res.status(400).json({ error: "El email ya está registrado" });
                return res.status(500).json({ error: "Error en el servidor" });
            }
            res.json({ message: "Usuario registrado con éxito ✅" });
        }
    );
});

// Login 
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query(
        "SELECT * FROM usuarios WHERE email = ?",
        [email],
        async (err, results) => {
            if (err) return res.status(500).json({ error: "Error en el servidor" });
            if (results.length === 0) return res.status(401).json({ error: "Usuario no encontrado" });

            const user = results[0];
            const match = await bcrypt.compare(password, user.password);
            if (!match) return res.status(401).json({ error: "Contraseña incorrecta" });

            req.session.userId = user.id;
            res.json({ message: "Login exitoso 🎉" });
        }
    );
});

// Logout
app.post("/logout", (req, res) => {
    if (!req.session) return res.status(400).json({ error: "No hay sesión activa" });

    req.session.destroy(err => {
        if (err) return res.status(500).json({ error: "Error al cerrar sesión" });
        res.json({ message: "Sesión cerrada con éxito" });
    });
});

// Comprobar sesión
app.get("/check-session", (req, res) => {
    if (req.session.userId) res.json({ logged: true });
    else res.json({ logged: false });
});


// ENDPOINT RETIRO
app.post('/retiro', async (req, res) => {
    const { nombreCliente, emailCliente, detalles } = req.body;

    if(!nombreCliente || !emailCliente || !detalles) 
        return res.status(400).json({ success: false, message: "Faltan datos" });
    

    // Email cliente
    const mailCliente = {
        from: 'bakevalentine.contacto@gmail.com',
        to: emailCliente,
        subject: 'Confirmación de retiro',
        html: `
            <h2>Hola ${nombreCliente}, tu retiro fue registrado</h2>
            <p>Detalles: ${detalles}</p>
            <p>Dirección: Castro 1619</p>
            <p>Horario: Lunes a Sábados - 10:00 a 19:00</p>
        `
    };

    // Email admin
    const mailAdmin = {
        from: 'bakevalentine.contacto@gmail.com',
        to: 'bakevalentine.contacto@gmail.com',
        subject: 'Nuevo retiro registrado',
        html: `
            <h2>Nuevo retiro:</h2>
            <p>Cliente: ${nombreCliente}</p>
            <p>Email: ${emailCliente}</p>
            <p>Detalles: ${detalles}</p>
        `
    };

    try {
        await transporter.sendMail(mailCliente);
        await transporter.sendMail(mailAdmin);
        res.json({ success: true, message: 'Emails de retiro enviados correctamente' });
    } catch(err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error enviando emails', error: err });
    }
});

// ENDPOINT ENVÍO/COMPRA
app.post('/envio', async (req, res) => {
    const { nombreCliente, emailCliente, direccion, barrio, cp, detalles, carrito, total } = req.body;

    if(!nombreCliente || !emailCliente || !direccion || !carrito || !total)
        return res.status(400).json({ success: false, message: "Faltan datos" });

    // Email cliente
    const mailCliente = {
        from: 'bakevalentine.contacto@gmail.com',
        to: emailCliente,
        subject: 'Confirmación de tu compra',
        html: `
            <h2>Gracias por tu compra, ${nombreCliente}</h2>
            <p>Total: $${total}</p>
            <p>Dirección: ${direccion}, ${barrio || ''}, CP: ${cp || ''}</p>
            <p>Detalles: ${detalles || ''}</p>
            <h3>Productos:</h3>
            <ul>
                ${carrito.map(item => `<li>${item.nombre} x${item.cantidad} - $${item.total}</li>`).join('')}
            </ul>
        `
    };

    // Email admin
    const mailAdmin = {
        from: 'bakevalentine.contacto@gmail.com',
        to: 'bakevalentine.contacto@gmail.com',
        subject: 'Nueva compra realizada',
        html: `
            <h2>Detalles de la compra:</h2>
            <p>Cliente: ${nombreCliente}</p>
            <p>Email: ${emailCliente}</p>
            <p>Dirección: ${direccion}, ${barrio || ''}, CP: ${cp || ''}</p>
            <p>Detalles: ${detalles || ''}</p>
            <p>Total: $${total}</p>
            <h3>Productos:</h3>
            <ul>
                ${carrito.map(item => `<li>${item.nombre} x${item.cantidad} - $${item.total}</li>`).join('')}
            </ul>
        `
    };

    try {
        await transporter.sendMail(mailCliente);
        await transporter.sendMail(mailAdmin);
        res.json({ success: true, message: 'Emails de compra enviados correctamente' });
    } catch(err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error enviando emails', error: err });
    }
});
 
//contacto
app.post('/contacto', async (req, res) => {
    const { nombre, telefono, email, mensaje } = req.body;

    // Mail al cliente (opcional, si querés confirmar que se recibió)
    const mailCliente = {
        from: 'bakevalentine.contacto@gmail.com',
        to: email,
        subject: 'Recibimos tu mensaje',
        html: `
            <h2>Hola ${nombre}, gracias por contactarnos</h2>
            <p>Hemos recibido tu mensaje y te responderemos pronto.</p>
            <p>Tu mensaje:</p>
            <blockquote>${mensaje}</blockquote>
        `
    };

    // Mail al admin
    const mailAdmin = {
        from: 'bakevalentine.contacto@gmail.com',
        to: 'bakevalentine.contacto@gmail.com',
        subject: 'Nuevo mensaje desde la web',
        html: `
            <h2>Nuevo mensaje de contacto:</h2>
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Teléfono:</strong> ${telefono}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mensaje:</strong></p>
            <blockquote>${mensaje}</blockquote>
        `
    };

    try {
        // Enviar mails
        await transporter.sendMail(mailCliente); // opcional
        await transporter.sendMail(mailAdmin);
        res.json({ success: true, message: 'Mensaje enviado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al enviar el mensaje', error });
    }
});

//feedback
app.post('/feedback', async (req, res) => {
    const { nombre, email, mensaje } = req.body;

    if(!nombre || !email || !mensaje) 
        return res.status(400).json({ success: false, message: "Faltan datos" });

    // Mail al admin
    const mailAdmin = {
        from: 'bakevalentine.contacto@gmail.com',
        to: 'luciano.delapena@gmail.com', // o el correo de la admin
        subject: 'Nuevo feedback recibido',
        html: `
            <h2>Nuevo feedback:</h2>
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mensaje:</strong></p>
            <blockquote>${mensaje}</blockquote>
        `
    };

    try {
        await transporter.sendMail(mailAdmin);
        res.json({ success: true, message: 'Feedback enviado correctamente' });
    } catch(err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error enviando feedback', error: err });
    }
});

app.post("/forgot-password", (req, res) => {
    const { email } = req.body;

    db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, results) => {
        if (err) return res.status(500).json({ error: "Error en el servidor" });
        if (results.length === 0) return res.json({ message: "Si el correo está registrado, recibirás un email" });

        const user = results[0];
        const token = crypto.randomBytes(32).toString("hex");
        const expiration = Date.now() + 3600000; // 1 hora

        // Guardar token y expiración en la DB
        db.query(
            "UPDATE usuarios SET resetToken = ?, resetTokenExp = ? WHERE id = ?",
            [token, expiration, user.id],
            (err) => {
                if (err) return res.status(500).json({ error: "Error guardando token" });

                // Configurar nodemailer
                const transporter = nodemailer.createTransport({
                    service: "Gmail",
                    auth: { user: "bakevalentine.contacto@gmail.com", pass: "xmjqnoednsusefxq" }
                });

                const mailOptions = {
                    from: "bakevalentine.contacto@gmail.com",
                    to: user.email,
                    subject: "Restablece tu contraseña",
                    html: `<p>Haz clic en el enlace para restablecer tu contraseña:</p>
                           <a href="http://127.0.0.1:5500/bakevalentine_html/footer/login/reset-password.html?token=${token}">Restablecer contraseña</a>
                           <p>Este enlace expira en 1 hora.</p>`
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) console.log(error);
                    res.json({ message: "Si el correo está registrado, recibirás un email" });
                });
            }
        );
    });
});

// Ruta para cambiar la contraseña
app.post("/reset-password", async (req, res) => {
    const { token, password } = req.body;

    db.query(
        "SELECT * FROM usuarios WHERE resetToken = ? AND resetTokenExp > ?",
        [token, Date.now()],
        async (err, results) => {
            if (err) return res.status(500).json({ error: "Error en el servidor" });
            if (results.length === 0) return res.status(400).json({ error: "Token inválido o expirado" });

            const hashedPassword = await bcrypt.hash(password, 10);
            const userId = results[0].id;

            db.query(
                "UPDATE usuarios SET password = ?, resetToken = NULL, resetTokenExp = NULL WHERE id = ?",
                [hashedPassword, userId],
                (err) => {
                    if (err) return res.status(500).json({ error: "Error actualizando contraseña" });
                    res.json({ message: "Contraseña actualizada con éxito ✅" });
                }
            );
        }
    );
});

// Ruta para obtener datos del usuario logueado
app.get("/usuario", (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: "No hay sesión activa" });
    }

    db.query("SELECT id, nombre, email FROM usuarios WHERE id = ?", [req.session.userId], (err, results) => {
        if (err) return res.status(500).json({ error: "Error en el servidor" });
        if (results.length === 0) return res.status(404).json({ error: "Usuario no encontrado" });

        const usuario = results[0];
        res.json(usuario);
    });
});


// Servidor
app.listen(3000, () => console.log("Servidor corriendo en http://127.0.0.1:3000 🚀"));
