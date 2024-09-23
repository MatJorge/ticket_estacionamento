let estacionamento = {};

document.getElementById('submitPlaca').addEventListener('click', () => {
    const placa = document.getElementById('placaInput').value;
    if (placa) {
        const agora = new Date();
        estacionamento[placa] = {
            horario: agora,
            pago: false
        };
        document.getElementById('placaMessage').textContent = `Placa ${placa} cadastrada com sucesso!`;
        document.getElementById('placaInput').value = '';
    }
});

document.getElementById('calculateTime').addEventListener('click', () => {
    const placa = document.getElementById('placaCalculoInput').value;
    if (estacionamento[placa]) {
        const agora = new Date();
        const horarioEntrada = estacionamento[placa].horario;
        const tempoEstadia = Math.floor((agora - horarioEntrada) / 1000 / 60); // em minutos
        const valor = tempoEstadia * 0.20;

        document.getElementById('calculoMessage').textContent = `Tempo de estadia: ${tempoEstadia} minutos. Total a pagar: R$${valor.toFixed(2)}`;
        estacionamento[placa].valor = valor;
        document.getElementById('pagarButton').style.display = 'block';
    } else {
        document.getElementById('calculoMessage').textContent = 'Placa não encontrada.';
    }
});

document.getElementById('pagarButton').addEventListener('click', () => {
    const placa = document.getElementById('placaCalculoInput').value;
    if (estacionamento[placa]) {
        estacionamento[placa].pago = true;
        document.getElementById('calculoMessage').textContent += ' Pagamento realizado com sucesso!';
    }
});

document.getElementById('checkPayment').addEventListener('click', () => {
    const placa = document.getElementById('placaVerificaInput').value;
    if (estacionamento[placa]) {
        const pago = estacionamento[placa].pago;
        document.getElementById('verificaMessage').textContent = pago ? 'Volte sempre!' : 'Pague o que deve!';
    } else {
        document.getElementById('verificaMessage').textContent = 'Placa não encontrada. Tente novamente.';
    }
});

// Função para alternar telas
function changeScreen(from, to) {
    document.getElementById(from).classList.remove('active');
    document.getElementById(to).classList.add('active');
}