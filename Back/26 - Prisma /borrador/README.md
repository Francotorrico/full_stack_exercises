
# prisma pasos de clase 26


# en pirmer paso levanto docker
postgres
adminer
 
 # dependencia de prisma
 pnpm add -D prisma


 # inicializo prisma
pnpm prisma init

# en env

DATABASE_URL="postgresql://f1user:f1pass@localhost:5450/f1db" para conecatrarme a mi db por ejemplo

en prisma/schema.prisma
model Driver {

  campo tipo_de_dato resticcion
}


# nuestra primer migracion 
pnpm prisma migrate dev --name init

o sino 
pnpm prisma migrate dev --name add-driver-table


cambie en driverModule el driverJsonRepository a DriverPrismaRepository


se agrega la tabla races en la base de datos con relacion a drivers
pnpm prisma migrate dev --name add-races-table


# prisma generate

# prisma init

# prisma migrate dev --name add-driver-table
pnpm prisma migrate dev --name add-driver-table
instala prisma client

