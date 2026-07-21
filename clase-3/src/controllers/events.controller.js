import { eventsService } from "../services/events.service.js"
import { CategoryModel } from "../models/category.model.js"

const getEvents = (req,res) => {

    res.json({status:"success"})
}


const getEvent = (req,res) => {
    res.json({status:"success"})
}


const createEvent = async (req,res) => {
    const {
        title,
        description,
        categoryId,
        date,
        capacity,
        price,
        organizerId
    } = req.body

    const titleRegex       = /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s.,:;'"()\-¡!¿?&]{3,120}$/;
    const descriptionRegex = /^[\s\S]{10,2000}$/;
    const objectIdRegex    = /^[0-9a-fA-F]{24}$/;
    const dateRegex = /^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
    const capacityRegex    = /^[1-9]\d{0,5}$/;
    const priceRegex       = /^\d+(\.\d{1,2})?$/;

    const [day, month, year] = date.split("-").map(Number)
    const dateFormated = new Date(year, month - 1, day)

    if (!title || !titleRegex.test(title)) return res.json({status:"error", message:"El título debe tener entre 3 y 120 caracteres y no puede incluir símbolos raros"})
    if (!description || !descriptionRegex.test(description)) return res.json({status:"error", message:"La descripción debe tener entre 10 y 2000 caracteres"})
    if (!categoryId || !objectIdRegex.test(categoryId)) return res.json({status:"error", message:"La categoría no tiene un id válido"})
    if (!organizerId || !objectIdRegex.test(organizerId)) return res.json({status:"error", message:"El organizador no tiene un id válido"})
    if (!date || !dateRegex.test(date)) return res.json({status:"error", message:"La fecha debe tener el formato DD-MM-AAAA"})
    if (dateFormated <= new Date()) return res.json({status:"error", message:"La fecha debe ser posterior a hoy"})
    if (!capacity || !capacityRegex.test(capacity)) return res.json({status:"error", message:"La capacidad debe ser un número entero entre 1 y 999999"})
    if (!priceRegex.test(price)) return res.json({status:"error", message:"El precio debe ser un número positivo con hasta 2 decimales"})


    const event = {
        title,
        description,
        category:categoryId,
        date:dateFormated,
        capacity,
        price,
        organizer:organizerId
    }

    const result = await eventsService.createEvent(event)

    if(result.error) return res.json({status:"error",message:result.error.message})

    res.json({status:"success",payload:result.payload})
}


const updateEvent = (req,res) => {
    res.json({status:"success"})
}


const deleteEvent = (req,res) => {
    res.json({status:"success"})
}


const modifyStatus = (req,res) => {
    res.json({status:"success"})
}

const createCategory = async (req,res) =>{
    await CategoryModel.create({name:"Estadio",description:"fdasfd",isActive:true})
    res.json({status:"success"})
}

export const eventsController = {
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    modifyStatus,
    createCategory
}