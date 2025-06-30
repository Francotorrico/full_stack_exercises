/*
4. 🎯 Ejercicios prácticos
Ejercicio 1: Utility Types
Crea un sistema de gestión de productos que use Partial, Pick y Omit para diferentes operaciones ABM.

Ejercicio 2: Clases con Types
Implementa un sistema de usuarios con roles, usando herencia, interfaces y modificadores de acceso apropiados.

Ejercicio 3: Generic Types
Construye un sistema de cache genérico que pueda almacenar cualquier tipo de dato con TTL (time to live). Utiliza una clase con métodos set, get y cleanup.
 */


/*

Ejercicio 1: Utility Types
Crea un sistema de gestión de productos que use Partial, Pick y Omit para diferentes operaciones ABM.
*/


interface Product {


    id: number;
    name: string;
    price: number;
    description: string;

}
let products: Product[] = [];
let nextId = 1;
// mi alta
type ProductPickCreate = Pick<Product, "name" | "price" | "description">

function createProduct(product: ProductPickCreate): Product {

    const newProduct: Product = {
        id: nextId++,
        name: product.name,
        price: product.price,
        description: product.description,
    }
    products.push(newProduct);
    return newProduct;
}
// const product: ProductPickCreate = {
//     name: "mi producto",
//     price: 10,
//     description: "esto es mi producto"

// }

// de esta forma uso una funcion para crear producto pick
// const product2: Product = createProduct({
//     name: "mi producto",
//     price: 10,
//     description: "esto es mi producto"

// })
// console.log(product2)


//
type updateProduct = Partial<Product>;


function updateProduct(id: number, product: updateProduct): Product | undefined {
    const productFound = products.find(p => p.id === id);
    if (productFound) {
        Object.assign(productFound, product); // modifica directamente el objeto en el array
        return productFound;
    }
    return undefined;
}

type ProductPublic = Omit<Product, "description" | "price">;

function getProduct(id: number): ProductPublic | undefined {
    const productFound = products.find(p => p.id === id);
    if (productFound) {
        return {
            id: productFound.id,
            name: productFound.name,

        };
    }
    return undefined;
}



function deleteProduct(id: number): boolean {
    const productFound = products.findIndex((p) => p.id === id);
    if (productFound !== -1) {
        products.splice(productFound, 1);
        return true;
    }
    return false;
}


const p1 = createProduct({
    name: "monitor",
    price: 50000,
    description: "Pantalla Led"
});

console.log("ejercicio 1 ------------------------");
console.log("Producto creado:", p1);

const p2 = updateProduct(p1.id, { description: "Pantalla LCD" });
console.log("Producto actualizado:", p2);

const getProduct1 = getProduct(p1.id);
console.log("Producto obtenido:", getProduct1);

const borrado = deleteProduct(p1.id);
console.log("Producto eliminado:", borrado);

console.log("Estado final del array:", products);

/*
Mi salida es ->
Producto creado: { id: 1, name: "monitor", price: 50000, description: "Pantalla Led" }
Producto actualizado: { id: 1, name: "monitor", price: 50000, description: "Pantalla LCD" }
Producto obtenido: { id: 1, name: "monitor" }
Producto eliminado: true
Estado final del array: []
*/


// Ejercicios 2
/*
Implementa un sistema de usuarios con roles, usando herencia, interfaces y modificadores de acceso apropiados.

-> en este caso mi usuario tendra los siguientes datos
nombre: string;
email: string;
rol: string;
*/


// mi interfaz
interface interfaceUser {
    getId(): number;
    getName(): string;
    getEmail(): string;
    getRole(): string;
}

// mi clase User
abstract class User implements interfaceUser {
    protected id: number;
    protected name: string;
    protected email: string;
    protected role: string;

    constructor(id: number, name: string, email: string, role: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    public getId(): number {
        return this.id;
    }
    public getName(): string {
        return this.name;
    }
    public getEmail(): string {
        return this.email;
    }
    public getRole(): string {
        return this.role;
    }
}


// aca es mi herencia uso super para heredar de la clase User
class Administrator extends User {
    private privileges: string[];
    constructor(id: number, name: string, email: string) {
        super(id, name, email, "admin");
        this.privileges = ["add", "delete", "update"];
    }

    public getPermissions(): string[] {
        return this.privileges;
    }

    public describePrivileges(): void {
        console.log(` Admin ${this.name} tiene privilegios: ${this.privileges.join(", ")}`);
    }


}

class Client extends User {
    private points: number;

    constructor(id: number, name: string, email: string) {
        super(id, name, email, "client");
        this.points = 0;
    }

    public addPoints(points: number): void {
        this.points += points;
    }


    public viewGetPoints(): void {
        console.log(` Client ${this.name} tiene ${this.points} puntos`);
    }

}
console.log("ejercicio 2 ------------------------");

const admin = new Administrator(1, "pepe", "pepe@admin.com");
const client = new Client(2, "gerardo", "gerardo@cliente.com");

admin.describePrivileges(); 
// -> Admin pepe tiene privilegios: add, delete, update

client.addPoints(50);
client.viewGetPoints(); 
// -> Client gerardo tiene 50 puntos



// ejercicio 3
/*
Construye un sistema de cache genérico que pueda almacenar cualquier tipo de dato con TTL (time to live). Utiliza una clase con métodos set, get y cleanup.
*/
type CacheItem<T> = {
    value: T;
    expiry: number;
};
// -> defino objeto generico con tiempo de expiracion

class Cachecito<T> {
    // -> un store tipo map donde se guarda el objeto con tiempo de expiracion, asocia claves string con objetos de tipo cacheItem<T>
    //clave -> { value, expiry }
    private store: Map<string, CacheItem<T>> = new Map();
    //->cleanupIntervalId  guaradara identificador de intervalo
    // setInterval, para luego poder cancelarlo con clearInterval
    private cleanupIntervalId: ReturnType<typeof setInterval>;


    constructor(private cleanupIntervalMs: number = 5000) {
        this.cleanupIntervalId = setInterval(() => this.cleanup(), this.cleanupIntervalMs);
        // activa el temporizador de cleanup a intervalo de 5000 ms
        // guarda el identificador de intervalo en el atributo cleanupIntervalId
    }

    public set(key: string, value: T, ttlMs: number): void {
        const expiry = Date.now() + ttlMs;
        this.store.set(key, { value, expiry });
    }
    // set: guarda el valor y la expiracion en el store


    get(key: string): T | undefined {
        const item = this.store.get(key);
        if (!item) return undefined;
        if (Date.now() > item.expiry) {
            this.store.delete(key);
            return undefined;
        }
        return item.value;
    }
    // get: devuelve el valor si existe y no ha expirado
    // si no existe devuelve undefined es porque expiro


    public cleanup(): void {
        const now = Date.now();
        for (const [key, item] of this.store.entries()) {
            if (now > item.expiry) {
                this.store.delete(key);
            }
        }
    }
    // cleanup: limpia los elementos expirados
    
    stopCleanup(): void {
        clearInterval(this.cleanupIntervalId);
    }
    // stopCleanup: parar el temporizador de cleanup y no quede colgado en consola como es prueba

}

console.log("ejercicio 3 ------------------------");


/*
const cache = new Cachecito<number>();

cache.set("pepe", 1234, 3000); // TTL 3 segundos

console.log(cache.get("pepe")); // pepe

setTimeout(() => {
    console.log( "aca murio pepe " + cache.get("pepe")); // undefined es que expiro
    cache.cleanup();             // limpiar expirados
    cache.stopCleanup();           // detener temporizador de cleanup
}, 4000);
*/
const cache2 = new Cachecito<string>();

cache2.set("uno", "🍎", 2000);   // 2 segundos
cache2.set("dos", "🍌", 4000);   // 4 segundos
cache2.set("tres", "🍇", 6000);  // 6 segundos

console.log("Al inicio:", cache2.get("uno"), cache2.get("dos"), cache2.get("tres"));

setTimeout(() => {
  console.log("A los 3 segundos:");
  console.log("uno:", cache2.get("uno"));   // undefined
  console.log("dos:", cache2.get("dos"));   // 🍌
  console.log("tres:", cache2.get("tres")); // 🍇
}, 3000);

setTimeout(() => {
  cache2.stopCleanup(); // importante para terminar
}, 7000);
