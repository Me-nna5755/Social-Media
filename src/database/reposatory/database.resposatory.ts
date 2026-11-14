import mongoose, { Model } from 'mongoose';
import { IUser } from './../../common/interfaces/user.interface';
import { PopulateOptions } from "mongoose";


export  class DatabaseReposatory<TRawDoc> {
    constructor(private model: Model<TRawDoc>){
    }

    findAll({filter,select , populate ,lean }:{
        filter?: mongoose.QueryFilter<TRawDoc>
        select?:string,
        populate?:string,
        lean?:boolean
    }){
        let query:any =this.model.find()
        if (filter) {
            query=query.filter(filter)
        }
        if (select) {
            query=query.select(select)
        }
        if (populate) {
            query=query.populate(populate)
        }if (lean) {
            query=query.lean(lean)
        }
    return  query
    }
    findById({id,select , populate ,lean}:{
        id:string,
        select?:string,
        populate?:string,
        lean?:boolean
    }){
        let query:any =this.model.findById(id)
        if (select) {
            query=query.select(select)
        }
        if (populate) {
            query=query.populate(populate)
        }if (lean) {
            query=query.lean(true)
        }
    return  query
    }
    findOne({ filter, select, populate, lean}: {
        filter: any;
        select?: string;
        populate?: PopulateOptions | PopulateOptions[];
        lean?: boolean;
    }) {
        let query = this.model.findOne(filter);
        if (select) {
            query = query.select(select);
        }if (populate) {
            query = query.populate(populate);
        } if (lean) {
            return query.lean()
        }
        return query
    }
    updateOne({ filter, data}: {
        filter: any;
        data: any;
    }) {
        return this.model.updateOne(filter,data)
    }
    deleteOne({ filter}: {
        filter: any;
    }) {
        return this.model.deleteOne(filter)
    }
    create(data:TRawDoc){
    return this.model.create(data)
    }

}