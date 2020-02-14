import { Notebook } from './notebook';

export interface Note {

id:number;
title: string;
text:string;
notebook: Notebook;
lastModifiedOn?:string;


   
}