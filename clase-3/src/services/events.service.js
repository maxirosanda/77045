import { EventModel } from "../models/event.model.js"

const getEvents = () => {
    
    return {payload:[]}
}


const getEvent = () => {

    return {}

}


const createEvent = async (event) => {
    try {
        const eventCreated = await EventModel.create(event)
        return {
                error:null,
                payload:event,
                message:"Evento creado correctamente"
        }
    } catch (error) {
        return {
                error,
                payload:null,
                message:"error al crear el evento"
        }
    }
}


const updateEvent = () => {
    return {}
}


const deleteEvent = () => {
    return {}
}


const modifyStatus = () => {
    return {}
}

export const eventsService = {
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    modifyStatus
}