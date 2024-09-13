// Classe para gerenciar o jogo de adivinhação de músicas
class JogoDeMusicas {
    constructor() {
        // Lista de músicas com o caminho para os arquivos de áudio
        this.musicas = [
            { titulo: "Boa memória", artista: "Luan santana", arquivo: "audios/15 Luan Santana - Boa memória.mp3" },
            { titulo: "Só fé", artista: "Grelo", arquivo: "audios/08 - SÓ FÉ.mp3" },
            { titulo: "Só depois", artista: "Grupo Revelação", arquivo: "audios/10 - Só Depois.mp3" },
            { titulo: "Antes do sol nascer", artista: "Orochi", arquivo: "audios/8 - Antes do Sol Nascer.mp3" },
            { titulo: "Sunshine", artista: " Delacruz", arquivo: "audios/3 . Delacruz - Sunshine (Nonsense . Vol 1)(MP3_128K).mp3" }
        ];
        this.tentativas = 5;
        this.musicaAtual = this.sortearMusica();
        this.acertou = false;
        this.audioPlayer = document.getElementById("music-player"); // Referência ao player de áudio
    }

    // Função para sortear uma música aleatoriamente
    sortearMusica() {
        const indiceAleatorio = Math.floor(Math.random() * this.musicas.length);
        return this.musicas[indiceAleatorio];
    }

    // Função que toca a amostra da música
    playMusic() {
        if (this.acertou || this.tentativas <= 0) {
            this.mostrarMensagem("O jogo já terminou! Atualize a página para jogar novamente.");
            return;
            
        }

        // Carrega o arquivo de áudio correspondente à música
        this.audioPlayer.src = this.musicaAtual.arquivo;
        this.audioPlayer.hidden = false; // Torna o player visível
        this.audioPlayer.play(); // Reproduz o áudio
        this.mostrarMensagem(`Tocando amostra da música do artista: ${this.musicaAtual.artista}`);
    }

    // Função que processa a tentativa de adivinhação do jogador
    adivinhar() {
        if (this.acertou || this.tentativas <= 0) {
            this.mostrarMensagem("O jogo já terminou! Atualize a página para jogar novamente.");
            return;
        }

        const palpite = document.getElementById("guess").value.trim().toLowerCase();
        const respostaCorreta = this.musicaAtual.titulo.toLowerCase();

        // Verifica se o jogador acertou
        if (palpite === respostaCorreta) {
            this.acertou = true;
            this.audioPlayer.pause(); // Para o áudio se o jogador acertar
            this.mostrarMensagem(`Parabéns! Você adivinhou a música: "${this.musicaAtual.titulo}" do artista ${this.musicaAtual.artista}.`);
        } else {
            this.tentativas--;
            this.mostrarMensagem("Resposta incorreta! Tente novamente.");
        }

        // Atualiza o número de tentativas restantes
        document.getElementById("attempts").innerText = this.tentativas;

        // Verifica se o jogador perdeu o jogo
        if (this.tentativas === 0 && !this.acertou) {
            this.mostrarMensagem(`Game Over! A música correta era "${this.musicaAtual.titulo}" do artista ${this.musicaAtual.artista}.`);
        }
    }

    // Função para exibir mensagens ao jogador
    mostrarMensagem(mensagem) {
        document.getElementById("result").innerText = mensagem;
    }
}

// Instancia o jogo
const game = new JogoDeMusicas();
