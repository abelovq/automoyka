import QRCode from "qrcode";

class QrcodeService {
  async generateQR(arg: any) {
    try {
      const qr = await QRCode.toFile(
        "./qrcodes.png",
        `Наша автомойка ${arg.washName} ждет Вас ${arg.carNumber} в ${arg.time} бокс №${arg.box}`
      );
      return qr;
    } catch (err) {
      console.error(err);
    }
  }
}
export default new QrcodeService();
