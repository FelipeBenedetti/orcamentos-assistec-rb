function Home() {
  return (
    <>
      <h1 style={{display:"flex", justifyContent: "center"}}>Barbearia do Eliseu</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center", // Centraliza horizontalmente
          height: "100vh",          // Ocupa 100% da altura da viewport (para centralização vertical)
        }}
      >
        <iframe
          src="https://cdn.htmlgames.com/HappyBird/"
          width="1000"
          height="600"
          allowFullScreen
          title="Jogo Embutido"
        ></iframe>
      </div>
    </>
  );
}

export default Home;

