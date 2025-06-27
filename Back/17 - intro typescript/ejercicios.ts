//ejercicio 1
//Crear una interfaz Product con propiedades como nombre, precio, stock 
// y una función para calcular el valor total.

interface Product {
    name: string;
    price: number;
    stock: number;
}



function totalPrice(product: Product): number {
    let total: number = product.price * product.stock;
    return total;
}

const myproduct: Product = {
    name: "producto",
    price: 10,
    stock: 10
}
// ejemplo de uso
console.log('toltas price: ' + totalPrice(myproduct))
// sale 100 -> porque 10 * 10



// ejrercicio 2
//Implementar un sistema de tipos para un carrito de compras con funciones
//  para añadir/eliminar productos y calcular el total.

interface carts {
    product: Product;
    quantity: number;

}


class systemCarts {
    private products: carts[] = [];


    public addProduct(product: Product, quantity: number): void {
        this.products.push({ product: product, quantity: quantity });

    };

    public deleteProduct(product: Product): void {
        this.products = this.products.filter(p => p.product !== product);
    };

    public getTotalPrice(): number {
        let total = 0;
        for (let i = 0; i < this.products.length; i++) {
            const item = this.products[i];
            total += item.product.price * item.quantity;
        }
        return total;

    };


    public getTotalPriceTypescript(): number {
        let total: number = 0;
        for (let i: number = 0; i < this.products
            .length; i++) {
            const productElement: carts = this.products[i];
            total += productElement.product.price * productElement.quantity;
        }
        return total;
    }


}


// correr codigo 
//  productos
const producto1: Product = { name: "usb", price: 100, stock: 50 };
const producto2: Product = { name: "Teclado", price: 200, stock: 20 };
const producto3: Product = { name: "Mouse", price: 50, stock: 30 };

// instancia del carrito
const carrito = new systemCarts();

carrito.addProduct(producto1, 2); // 2 x 100 = 200
carrito.addProduct(producto2, 1); // 1 x 200 = 200
carrito.addProduct(producto3, 3); // 3 x 50 = 150


console.log("Total del carrito:", carrito.getTotalPrice()); // 200 + 200 + 150 = 550

// se elimina un producto
carrito.deleteProduct(producto2); // elimina el teclado

// el total actualizado
console.log("Total despues de borrar teclado:", carrito.getTotalPrice()); //  200 + 150 = 350

//Ejercicio 3
//Convertir una función JavaScript existente a TypeScript añadiendo tipos adecuados.

console.log("Total desde getTotalPriceTypescript:", carrito.getTotalPriceTypescript()); // 600
