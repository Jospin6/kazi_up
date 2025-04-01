// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

declare global {
    var prisma: PrismaClient | undefined;
}

// Création de l'instance Prisma
const prisma = new PrismaClient();

// Eviter de recréer l'instance lors du hot-reloading (utile en développement)
if (process.env.NODE_ENV === 'development') {
    global.prisma = prisma; // Attache l'instance à l'objet global (uniquement en développement)
}

export default prisma;
