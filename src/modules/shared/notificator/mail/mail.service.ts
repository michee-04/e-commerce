import {
  ErrorResponse,
  ErrorResponseType,
  SuccessResponseType,
} from '@nodesandbox/response-kit';
import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';
import path from 'path';

class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: CONFIG.mail.host,
      port: CONFIG.mail.port,
      secure: CONFIG.runningProd && CONFIG.mail.port === 465,
      auth: CONFIG.runningProd
        ? {
            user: CONFIG.mail.user,
            pass: CONFIG.mail.pass,
          }
        : undefined,
    });
  }

  async sendMail({
    to,
    subject,
    text,
    htmlTemplate,
    templateData,
    fromName,
    fromEmail,
  }: {
    to: string;
    subject: string;
    text?: string;
    htmlTemplate?: string;
    templateData?: Record<string, any>;
    fromName?: string;
    fromEmail?: string;
  }): Promise<SuccessResponseType<void> | ErrorResponseType> {
    try {
      let htmlContent;
      if (htmlTemplate) {
        const templatePath = path.join(
          process.cwd(),
          'src/templates/mail',
          `${htmlTemplate}.html`,
        );

        const templateSource = fs.readFileSync(templatePath, 'utf-8');
        const template = handlebars.compile(templateSource);
        htmlContent = template(templateData);
      }

      const mailOptions = {
        from: `"${fromName || CONFIG.mail.fromName}" <${
          fromEmail || CONFIG.mail.from
        }>`,
        to,
        subject,
        text,
        html: htmlContent,
      };

      await this.transporter.sendMail(mailOptions);
      return { success: true };
    } catch (error) {
      LOGGER.error('Error sending email', error as Error);
      return {
        success: false,
        error: new ErrorResponse({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to send email',
          statusCode: 500,
          suggestions: ['Please try again later.'],
          originalError: error as Error,
        }),
      };
    }
  }

  async sendMailNotification({
    to,
    subject,
    text,
    htmlTemplate,
    templateData,
    fromName,
    fromEmail,
  }: {
    to: string;
    subject: string;
    text?: string;
    htmlTemplate?: string;
    templateData?: Record<string, any>;
    fromName?: string;
    fromEmail?: string;
  }): Promise<SuccessResponseType<void> | ErrorResponseType> {
    try {
      let htmlContent;
      if (htmlTemplate) {
        const templatePath = path.join(
          process.cwd(),
          'src/templates/mail',
          `${htmlTemplate}.html`,
        );

        const templateSource = fs.readFileSync(templatePath, 'utf-8');
        const template = handlebars.compile(templateSource);
        htmlContent = template(templateData);
      }

      const mailOptions = {
        from: `"${fromName || CONFIG.mail.fromName}" <${
          fromEmail || CONFIG.mail.from
        }>`,
        to,
        subject,
        text,
        html: htmlContent,
      };

      await this.transporter.sendMail(mailOptions);
      return { success: true };
    } catch (error) {
      LOGGER.error('Error sending email', error as Error);
      return {
        success: false,
        error: new ErrorResponse({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to send email',
          statusCode: 500,
          suggestions: ['Please try again later.'],
          originalError: error as Error,
        }),
      };
    }
  }
}

export default new MailService();
