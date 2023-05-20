import mods from './mods.module.css';
import skills from './skills.module.css';
import about from './about.module.css';
import index from './index.module.css';
import admin from './admin.module.css';

const classes: {[key: string]: {readonly [key: string]: string}} = {
    mods,
    skills,
    about,
    index,
    admin
}

export default classes;