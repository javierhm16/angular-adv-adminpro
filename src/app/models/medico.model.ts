import { Hospital } from './hospital.model'

interface _medicolUser {
    _id: string,
    name: string,
    img: string
}

export class Medico {

    constructor(
        public name: string,
        public _id: string = '',
        public img: string = '',
        public user?: _medicolUser,
        public hospital?: Hospital
    ) {

    }

}