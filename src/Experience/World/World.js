import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import Fox from './Fox.js'
import Robot from './Robot.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.floor = new Floor()
            this.fox = new Fox()
            this.robot = new Robot("robot1")
            this.environment = new Environment()
        })
    }

    update()
    {
        if(this.fox)
            this.fox.update()
        if(this.robot)
            this.robot.update()
    }
}