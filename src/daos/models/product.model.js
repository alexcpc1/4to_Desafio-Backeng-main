import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "products";

const productSchema= new mongoose.Schema({
    title: {type: String,required:true},
    description: {type: String,required:true},
    price: { type: Number,required:true,min:1},
    thumbnail: {type: String,required:true},
    code: {type: String,required:true},
    stock: {type: Number,required:true},
    status:{type: Boolean,required:true},
    category:{ type: String,required:true,enum: ['Deportes', 'Tecnología','Ropa']},
});

productSchema.plugin(mongoosePaginate);
export const ProductsModel = mongoose.model(productCollection,productSchema);

// "title": "Zapatos de Deporte",
// "description": "Zapatillas Futbol De Hombre Running Deporte color naranja",
// "price": 22000,
// "thumbnail": "https://falabella.scene7.com/is/image/Falabella/gsc_120929904_2858179_1?wid=1500&hei=1500&qlt=70",
// "code": "777",
// "stock": 30,
// "status": true,
// "category": "Deportes"

// "title": "Rodillera",
// "description": "Deporte Running Compresión Rodilla Manga Soporte Elástico",
// "price": 9000,
// "thumbnail": "https://falabella.scene7.com/is/image/Falabella/gsc_120929904_2858179_1?wid=1500&hei=1500&qlt=70",
// "code": "23",
// "stock": 115,
// "status": true,
// "category": "Deportes"

// "title": "Balon De Voleibol",
// "description": "Balon De Voleibol Molten V5m1500 Serve N° 5",
// "price": 18000,
// "thumbnail": "https://falabella.scene7.com/is/image/Falabella/gsc_116155444_1385237_1?wid=1500&hei=1500&qlt=70",
// "code": "43",
// "stock": 292,
// "status": true,
// "category": "Deportes"

// "title": "Pijama de Hombre",
// "description": "Benetton Pijama Largo Hombre",
// "price": 14000,
// "thumbnail": "https://falabella.scene7.com/is/image/Falabella/882685174_1?wid=1500&hei=1500&qlt=70",
// "code": "26",
// "stock": 344,
// "status": true,
// "category": "Ropa"

// {
// "title": "Ropa Interior de Mujer",
// "description": "Pack 6 Calzones algodón mujer señora peruano nuevo",
// "price": 23000,
// "thumbnail": "https://falabella.scene7.com/is/image/Falabella/gsc_116885457_1587526_1?wid=1500&hei=1500&qlt=70",
// "code": "66",
// "stock": 201,
// "status": true,
// "category": "Ropa"
// }
// {
// "title": "Televisor Smart tv",
// "description": "Led 55 UQ7500PSF.AWH UHD Smart tv",
// "price": 250000,
// "thumbnail": "https://sodimac.scene7.com/is/image/SodimacCL/7197179_01?wid=1500&hei=1500&qlt=70",
// "code": "11",
// "stock": 10,
// "status": true,
// "category": "Tecnología"
// }
// {
// "title": "Audifonos Inalambricos",
// "description": "Audifonos In-ear Inalambricos Audifonos Auricular Bluetooth",
// "price": 8000,
// "thumbnail": "https://falabella.scene7.com/is/image/Falabella/gsc_119082548_2228809_1?wid=1500&hei=1500&qlt=70",
// "code": "14",
// "stock": 105,
// "status": true,
// "category": "Tecnología"
// }
// {
// "title": "Smartphone",
// "description": "Smartphone Poco M5 128GB Black",
// "price": 330000,
// "thumbnail": "https://s7d2.scene7.com/is/image/Tottus/21101559_1?wid=1500&hei=1500&qlt=70",
// "code": "1233",
// "stock": 126,
// "status": true,
// "category": "Tecnología"
// }

// {
// "title": "Botines de fútbol",
// "description": "Botines de fútbol con suela especial de tracción en terrenos de césped",
// "price": 10000,
// "thumbnail": "https://example.com/botines.jpg",
// "code": "343",
// "stock": 2,
// "status": true,
// "category": "Deportes"
// }