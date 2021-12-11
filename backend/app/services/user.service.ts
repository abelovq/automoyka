import { User } from "@prisma/client";
import HttpException from "../exceptions/HttpExceptions";
import prisma from "../prisma";

class UserService {
  async createUser(userData: User): Promise<User> {
    return await prisma.user
      .create({
        data: {
          ...userData,
        },
      })
      .catch((err) => {
        console.log(err);
        throw new HttpException(400, "Cannot create user");
      });
  }

  async getUserById(id: number): Promise<User | null> {
    return await prisma.user
      .findFirst({
        where: {
          id,
        },
      })
      .catch((err) => {
        console.log(err);
        throw new HttpException(404, "User is not found");
      });
  }

  async updateUser(userData: Partial<User>): Promise<User> {
    const { id, ...updatingData } = userData;

    return await prisma.user
      .update({
        where: {
          id,
        },
        data: updatingData,
      })
      .catch((err) => {
        console.log(err);
        throw new HttpException(400, "Cannot update user");
      });
  }

  async deleteUser(id: number): Promise<User> {
    return await prisma.user
      .delete({
        where: {
          id,
        },
      })
      .catch((err) => {
        console.log(err);
        throw new HttpException(404, "User is not find");
      });
  }
}

export default new UserService();
