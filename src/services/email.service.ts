import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import * as path from "path";

import { configs } from "../configs/config";
import { allTemplates } from "../constants/email.constants";
import { EEmailAction } from "../enums/email.enum";

class EmailService {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      from: "No reply",
      service: "gmail",
      auth: {
        user: configs.NO_REPLY_EMAIL,
        pass: configs.NO_REPLY_PASSWORD,
      },
    });
    const hbsOptions = {
      viewEngine: {
        extname: ".hbs",
        defaultLayout: "main",
        layoutsDir: path.join(
          process.cwd(),
          "src",
          "email-template",
          "layouts"
        ),
        partialsDir: path.join(
          process.cwd(),
          "src",
          "email-template",
          "partials"
        ),
      },
      viewPath: path.join(process.cwd(), "src", "email-template", "views"),
      extname: ".hbs",
    };
    this.transporter.use("compile", hbs(hbsOptions));
  }
  public async sendMail(email: string, emailAction: EEmailAction) {
    const { templateName, subject } = allTemplates[emailAction];
    const mailOptions = {
      to: email,
      subject,
      template: templateName,
    };
    return await this.transporter.sendMail(mailOptions);
  }
}
export const emailService = new EmailService();
