const WhatsappFlotante = () => {
  const phoneNumber = "59164337000";
  const message = "Hola, estoy interesado en comprar...";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "60px",
        right: "20px",
        width: "60px",
        height: "60px",
        backgroundColor: "#25D366",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "999",
        textDecoration: "none",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}
      title="Contactar por WhatsApp"
    >
      <img
        src="/icon/whatsapp.gif"
        alt="WhatsApp"
        style={{ width: "36px", height: "36px", objectFit: "contain" }}
      />
    </a>
  );
};

export default WhatsappFlotante;
