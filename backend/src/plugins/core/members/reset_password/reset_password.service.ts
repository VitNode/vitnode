import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

import { DatabaseService } from "@/database/database.service";
import { core_users } from "../../admin/database/schema/users";
import { core_keys } from "../../admin/database/schema/keys";
import { SendAdminEmailService } from "../../admin/email/send/send.service";
import { ResetPasswordCoreMembersArgs } from "./dto/reset_password.args";

@Injectable()
export class ResetPasswordCoreMembersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly mailService: SendAdminEmailService
  ) {}

  async reset_password({
    email
  }: ResetPasswordCoreMembersArgs): Promise<string> {
    const user = await this.databaseService.db.query.core_users.findFirst({
      where: eq(core_users.email, email)
    });

<<<<<<< HEAD
    if (user == undefined) return "No such email found!";

=======
>>>>>>> a55175d5 (feat: Sending URL for resetting password)
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let key;

    do {
      key = "";
      for (let i = 0; i < 32; i++) {
        key += characters.charAt(Math.floor(Math.random() * characters.length));
      }
    } while (
      Boolean(
        await this.databaseService.db.query.core_keys.findFirst({
          where: eq(core_keys.key, key)
        })
      )
    );

<<<<<<< HEAD
    await this.databaseService.db.insert(core_keys).values({
      user_id: user.id,
      key: key
    });

=======
>>>>>>> a55175d5 (feat: Sending URL for resetting password)
    const message = `Hello ${user.first_name} ${user.last_name},\n\n
    To confirm your password reset, go to https://vitnode.com/?key=${key}.\n\n
    In most email programs, the address sent should work as an active link that can be clicked. If the link does not work, copy and paste it into the address bar of your browser (preferably Chrome or Opera).\n\n
    Best regards!\n
    VitNode Team`;

<<<<<<< HEAD
<<<<<<< HEAD
    const emailData = {
=======
    const emailArgs = {
>>>>>>> a55175d5 (feat: Sending URL for resetting password)
=======
    const emailData = {
>>>>>>> cb04e9d3 (fix: Correct returning type in ChangePasswordCoreMembersResolver)
      to: user.email,
      subject: "VitNode.com - password reset request",
      message: message
    };

<<<<<<< HEAD
<<<<<<< HEAD
    await this.mailService.send(emailData);
=======
    await this.mailService.send(emailArgs);
>>>>>>> a55175d5 (feat: Sending URL for resetting password)
=======
    await this.mailService.send(emailData);
>>>>>>> cb04e9d3 (fix: Correct returning type in ChangePasswordCoreMembersResolver)

    return "Success!";
  }
}
