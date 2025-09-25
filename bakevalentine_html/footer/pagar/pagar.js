// Recuperamos carrito de localStorage
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];


const cpInput = document.getElementById("CP");
const subtotalEnvioSpan = document.getElementById("subtotal-envio");
const envioEnvioSpan = document.getElementById("envio-envio");
const totalEnvioSpan = document.getElementById("total-envio");
const totalRetiroSpan = document.querySelector("#campos-retiro #total"); // span dentro de retiro

// Calculamos subtotal
let subtotal = carrito.reduce((acc, item) => acc + item.total, 0);
subtotalEnvioSpan.innerText = subtotal;
totalRetiroSpan.innerText = subtotal;

// Función para calcular envío y total
function calcularTotal() {
    let envio = 0;
    const cpInput = document.getElementById("CP");
    const cp = parseInt(cpInput.value);

    const codigosBoedo = [1218, 1220, 1221, 1226, 1228, 1230, 1231, 1232, 1233, 1235, 1236, 1237, 1238, 1239, 1240, 1241, 1250, 1257];
    const codigosRecoleta = [1000, 1001, 1011, 1012, 1013, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024, 1025, 1026, 1055, 1057, 1059, 1060, 1061, 1062, 1091, 1108, 1111, 1112, 1114, 1115, 1116, 1117, 1118, 1119, 1120, 1121, 1122, 1123, 1124, 1125, 1126, 1127, 1128, 1129, 1170, 1171, 1172, 1173, 1174, 1175, 1180, 1186, 1187, 1188, 1215, 1414, 1425];
    const codigosPalermo = [1004, 1007, 1019, 1055, 1113, 1172, 1175, 1176, 1177, 1179, 1180, 1181, 1182, 1183, 1186, 1188, 1414, 1416, 1425, 1426, 1428, 1429, 1439];
    const codigosAgronomia = [1417, 1419, 1427, 1431];
    const codigosAlmagro = [1172, 1247, 1200];
    const codigosBalvanera = [1020, 1022, 1025, 1026, 1027, 1028, 1029, 1030, 1031, 1032, 1033, 1034, 1036, 1039, 1040, 1044, 1045, 1046, 1051, 1052, 1056, 1079, 1080, 1081, 1083, 1089, 1090, 1091, 1094, 1096, 1098, 1170, 1171, 1172, 1173, 1174, 1179, 1180, 1181, 1183, 1186, 1187, 1189, 1190, 1191, 1193, 1194, 1196, 1197, 1198, 1201, 1203, 1204, 1207, 1209, 1210, 1211, 1212, 1213, 1214, 1215, 1219, 1222, 1223, 1225, 1227, 1229];
    const codigosBarrancas = [1066, 1104, 1110, 1138, 1139, 1140, 1141, 1143, 1152, 1153, 1164, 1255, 1260, 1265, 1267, 1268, 1269, 1270, 1271, 1272, 1273, 1274, 1275, 1276, 1277, 1278, 1279, 1280, 1281, 1282, 1283, 1284, 1285, 1286, 1287, 1288, 1289, 1290, 1291, 1292, 1293, 1294, 1295, 1296, 1425, 1437];
    const codigosBelgrano = [1424, 1425, 1426, 1428, 1429, 1430];
    const codigoLaboca = [1063, 1065, 1155, 1157, 1158, 1160, 1161, 1162, 1163, 1164, 1165, 1166, 1167, 1169, 1185, 1265, 1266];
    const codigoChacarita = [1414, 1416, 1418, 1427];
    const codigoCoghlan = [1428, 1429, 1430, 1431];
    const codigoColegiales = [1414, 1426, 1427, 1428];
    const codigoConstitucion = [1070, 1071, 1072, 1073, 1074, 1075, 1076, 1077, 1080, 1099, 1100, 1101, 1102, 1103, 1107, 1110, 1130, 1133, 1134, 1135, 1136, 1137, 1138, 1139, 1140, 1147, 1148, 1150, 1151, 1152, 1153, 1154, 1159, 1180, 1206, 1245, 1261, 1407, 1426, 1427];
    const codigoFloresta = [1406, 1407, 1416, 1419, 1440];
    const codigoMontserrat = [1000, 1002, 1010, 1014, 1020, 1033, 1041, 1063, 1064, 1065, 1066, 1067, 1068, 1069, 1070, 1071, 1072, 1073, 1074, 1075, 1076, 1077, 1078, 1079, 1080, 1082, 1084, 1085, 1086, 1087, 1088, 1091, 1092, 1093, 1095, 1096, 1097, 1098, 1100, 1101, 1107, 1110, 1134, 1135, 1136, 1158, 1168, 1405, 1406, 1407, 1416, 1424];
    const codigoMonteCastro = [1407, 1408, 1416, 1417, 1419];
    const codigoNuevaPompeya = [1263, 1429, 1436, 1437];
    const codigoNunez = [1428, 1429];
    const codigoParqueChas = [1427, 1431];
    const codigoParquePatricios = [1234, 1241, 1243, 1244, 1245, 1247, 1249, 1254, 1256, 1258, 1259, 1260, 1261, 1262, 1263, 1264, 1275, 1282, 1283, 1284, 1437];
    const codigoPaternal = [1416, 1417, 1427];
    const codigoPuertoMadero = [1000, 1001, 1005, 1006, 1007, 1010, 1184, 1425];
    const codigoRetiro = [1001, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 1016, 1021, 1025, 1054, 1055, 1057, 1058, 1059, 1061, 1062, 1099, 1104, 1111, 1120, 1125, 1156, 1416];
    const codigoSaveedra = [1428, 1429, 1430, 1431, 1431];
    const codigoSanCristobal = [1080, 1099, 1133, 1151, 1219, 1220, 1221, 1222, 1223, 1224, 1225, 1227, 1229, 1230, 1231, 1232, 1233, 1234, 1242, 1243, 1244, 1246, 1247, 1248, 1249, 1251, 1252, 1253, 1254, 1256, 1259];
    const codigoSanNicolas = [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020, 1022, 1023, 1025, 1026, 1028, 1033, 1035, 1036, 1037, 1038, 1039, 1040, 1041, 1042, 1043, 1044, 1045, 1047, 1048, 1049, 1050, 1053, 1053, 1055, 1056, 1066, 1084, 1105, 1106, 1190, 1416, 1425];
    const codigoSanTelmo = [1063, 1064, 1065, 1066, 1068, 1069, 1091, 1098, 1099, 1100, 1101, 1102, 1103, 1107, 1114, 1140, 1141, 1143, 1147, 1150, 1152, 1153, 1154, 1165, 1217, 1426];
    const codigoVelez = [1407];
    const codigoVersalles = [1086, 1407, 1408];
    const codigoVillaCrespo = [1069, 1183, 1189, 1405, 1414, 1416, 1425, 1192];
    const codigoVillaDelParque = [1084, 1407, 1414, 1416, 1417, 1417, 1419, 1425, 1428];
    const codigoDevoto = [1417, 1419];
    const codigoMitre = [1158, 1406, 1416, 1417, 1425, 1429];
    const codigoVillaLuro = [1407, 1408, 1416, 1440];
    const codigoVillaOrtuzar = [1427, 1430, 1431];
    const codigoVillaPueyrredon = [1419, 1425, 1431];
    const codigoVillaReal = [1006, 1408, 1414, 1417, 1419];
    const codigoVillaSantaRita = [1223, 1407, 1416, 1417, 1419];
    const codigoVillaUrquiza = [1427, 1428, 1430, 1431];
    const codigoCaballito = [1184, 1235, 1405, 1406, 1414, 1416, 1424];
    const codigoFlores = [1406, 1407, 1416, 1417, 1424, 1437];
    const codigoLiniers = [1407, 1408, 1440];
    const codigoMataderos = [1407, 1439, 1440];
    const codigoParqueAvellaneda = [1406, 1407, 1439, 1440];
    const codigoParqueChacabuco = [1238, 1250, 1406, 1424, 1437];
    const codigoLugano = [1407, 1439];
    const codigoVillaRiachuelo = [1439];
    const codigoVillaSoldati = [1406, 1407, 1437];


    if (codigosBoedo.includes(cp)) {
        envio = 0;
    }
    else if (codigosRecoleta.includes(cp)) {
        envio = 0;
    }
    else if (codigosPalermo.includes(cp)) {
        envio = 0;
    }
    else if (codigosAgronomia.includes(cp)) {
        envio = 0;
    }
    else if (codigosAlmagro.includes(cp)) {
        envio = 0;
    }
    else if (codigosBalvanera.includes(cp)) {
        envio = 0;
    }
    else if (codigosBarrancas.includes(cp)) {
        envio = 0;
    }
    else if (codigosBelgrano.includes(cp)) {
        envio = 0;
    }
    else if (codigoLaboca.includes(cp)) {
        envio = 0;
    }
    else if (codigoChacarita.includes(cp)) {
        envio = 0;
    }
    else if (codigoCoghlan.includes(cp)) {
        envio = 0;
    }
    else if (codigoColegiales.includes(cp)) {
        envio = 0;
    }
    else if (codigoConstitucion.includes(cp)) {
        envio = 0;
    }
    else if (codigoFloresta.includes(cp)) {
        envio = 0;
    }
    else if (codigoMontserrat.includes(cp)) {
        envio = 0;
    }
    else if (codigoMonteCastro.includes(cp)) {
        envio = 0;
    }
    else if (codigoNuevaPompeya.includes(cp)) {
        envio = 0;
    }
    else if (codigoNunez.includes(cp)) {
        envio = 0;
    }
    else if (codigoParqueChas.includes(cp)) {
        envio = 0;
    }
    else if (codigoParquePatricios.includes(cp)) {
        envio = 0;
    }
    else if (codigoPaternal.includes(cp)) {
        envio = 0;
    }
    else if (codigoPuertoMadero.includes(cp)) {
        envio = 0;
    }
    else if (codigoRetiro.includes(cp)) {
        envio = 0;
    }
    else if (codigoSaveedra.includes(cp)) {
        envio = 0;
    }
    else if (codigoSanCristobal.includes(cp)) {
        envio = 0;
    }

    envioEnvioSpan.innerText = envio;
    totalEnvioSpan.innerText = subtotal + envio;
}

// Actualiza total cada vez que cambian CP
document.getElementById("CP").addEventListener("input", calcularTotal);

// Inicializamos el total
calcularTotal();

// Botón Mercado Pago
document.getElementById("mercadoPago").addEventListener("click", () => {
    const totalAPagar = parseInt(totalSpan.innerText);
    if (totalAPagar === 0) {
        alert("Agregá productos y un código postal válido");
        return;
    }
    const preferenceId = "TU_PREFERENCE_ID"; // Generado desde tu backend
    window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${preferenceId}`;
});

// Botón Google Pay
document.getElementById("google").addEventListener("click", () => {
    const totalAPagar = parseInt(totalSpan.innerText);
    if (totalAPagar === 0) {
        alert("Agregá productos y un código postal válido");
        return;
    }
    alert("Aquí iría el flujo de pago con Google Pay.");
});

const form = document.getElementById('form-pago');
const metodoSelect = document.getElementById('metodo');
const envioDiv = document.getElementById('campos-envio');
const retiroDiv = document.getElementById('campos-retiro');

metodoSelect.addEventListener('change', () => {
    if (metodoSelect.value === 'envio') {
        envioDiv.style.display = 'block';
        retiroDiv.style.display = 'none';
    } else {
        envioDiv.style.display = 'none';
        retiroDiv.style.display = 'block';
    }
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const metodo = metodoSelect.value;
    let data = { metodo };

    if (metodo === 'envio') {
        data.nombre = document.getElementById('nombre').value;
        data.email = document.getElementById('email').value;
        data.barrio = document.getElementById('barrio').value;
        data.CP = document.getElementById('CP').value;
        data.direccion = document.getElementById('direccion').value;
        data.detalles = document.getElementById('detalles').value;
    } else {
        data.nombre = document.getElementById('retiro-nombre').value;
        data.email = document.getElementById('retiro-email').value;
        data.detalles = document.getElementById('retiro-detalles').value;
    }

    try {
        const res = await fetch('http://localhost:3000/pago', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const respuesta = await res.json();
        if (respuesta.success) {
            alert('✅ Pedido enviado correctamente');
            form.reset();
        } else {
            alert('❌ Error al enviar el pedido');
        }

    } catch (err) {
        console.error(err);
        alert('❌ Error al conectar con el servidor');
    }
});

const enviarEnvioBtn = document.getElementById('enviarEnvio');
const enviarRetiroBtn = document.getElementById('enviarRetiro');


// Botón envío
enviarEnvioBtn.addEventListener('click', async () => {
    const data = {
        nombreCliente: document.getElementById('nombre').value,
        emailCliente: document.getElementById('email').value,
        direccion: document.getElementById('direccion').value,
        barrio: document.getElementById('barrio').value,
        cp: document.getElementById('CP').value,
        detalles: document.getElementById('detalles').value
    };

    const res = await fetch('http://localhost:3000/envio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    const json = await res.json();
    alert(json.success ? "✅ Envío enviado correctamente" : "❌ Error al enviar el envío");
    form.reset();
});

// Botón retiro
enviarRetiroBtn.addEventListener('click', async () => {
    const data = {
        nombreCliente: document.getElementById('retiro-nombre').value,
        emailCliente: document.getElementById('retiro-email').value,
        detalles: document.getElementById('retiro-detalles').value
    };

    const res = await fetch('http://localhost:3000/retiro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    const json = await res.json();
    alert(json.success ? "✅ Retiro enviado correctamente" : "❌ Error al enviar el retiro");
    form.reset();
});
