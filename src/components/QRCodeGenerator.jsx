import QRCode from "react-qr-code";

const QRCodeGenerator = ({ value }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          padding: "0.5%",
          display: "inline-block",
        }}
      >
        <QRCode
          value={`https://x.com/${value}`}
          size={150}
          bgColor="#00000000"
          fgColor="#6c757d"
        />
      </div>
    </div>
  );
};

export default QRCodeGenerator;
