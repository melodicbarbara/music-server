//Standardized response function

import { getAllMusicsService, updateMusicService, createMusicService, deleteMusicService } from "../models/musicModel.js";

const handleResponse = ( res, status, message, data=null) => {
    res.status(status).json({    
        status,
        message,
        data,
    })
}

export const createMusic = async ( req, res, next)=> {
    try {
        if (!req.file) {
            return res.status(400).json({
                status: 400,
                message: "No file uploaded"
            });
        }
        
        const musicData = {
            ...req.body,
            content: req.file.buffer // Add file buffer as content
        };
        
        const result = await createMusicService(musicData);
        res.status(201).json({
            status: 201,
            message: "Music created successfully",
            data: result
        });
    } catch (error) {
        console.error("Error in createMusic:", error);
        res.status(500).json({
            status: 500,
            message: "Internal server error"
        });
    }
}

export const getAllMusic = async ( req, res, next)=> {
    const { name, email} = req.body;
    try {
        const users = await getAllMusicsService();
        handleResponse(res, 200, "Musics fetched successfully", users);
    } catch(err){
        next(err);
    }
}

export const getMusicByOrchestra = async ( req, res, next)=> {
    const { name, email} = req.body;
    try {
        const user = await getMusicByOrchestraService(req.params.id);
        if(!user) return handleResponse(res, 404, "Music not found");
        handleResponse(res, 200, "Music fetched successfully", user);
    } catch(err){
        next(err);
    }
}

export const updateMusic = async ( req, res, next)=> {
    const { name, email} = req.body;
    try {
        const user = await updateMusicService(req.params.id, name, email);
        if(!user) return handleResponse(res, 404, "Music not found");
        handleResponse(res, 200, "Music updated successfully", user);
    } catch(err){
        next(err);
    }
}

export const deleteMusic = async ( req, res, next)=> {
    try {
        const user = await deleteMusicService(req.params.id);
        if(!user) return handleResponse(res, 404, "Music not found");
        handleResponse(res, 200, "Music deleted successfully", user);
    } catch(err){
        next(err);
    }
}