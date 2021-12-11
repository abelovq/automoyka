import {Busy_boxes} from '@prisma/client'
import prisma from "../prisma";
class BoxService {
    async createBusyBox(boxData: Busy_boxes) {
     return await prisma.busy_boxes.create({
         data: boxData
     })
    }
};

export default BoxService;