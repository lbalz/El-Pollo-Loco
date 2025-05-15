/**
 * Class representing the keyboard input state for game controls
 * Manages the state of movement and action keys
 */
class Keyboard {
    /** 
     * @type {boolean} 
     * @default false
     * Whether the left movement key (LEFT ARROW or A) is pressed 
     */
    LEFT = false;

    /** 
     * @type {boolean} 
     * @default false
     * Whether the right movement key (RIGHT ARROW or D) is pressed 
     */
    RIGHT = false;

    /** 
     * @type {boolean} 
     * @default false
     * Whether the up/jump key (UP ARROW or W) is pressed 
     */
    UP = false;

    /** 
     * @type {boolean} 
     * @default false
     * Whether the down key (DOWN ARROW or S) is pressed 
     */
    DOWN = false;

    /** 
     * @type {boolean} 
     * @default false
     * Whether the space bar is pressed for jumping 
     */
    SPACE = false;

    /** 
     * @type {boolean} 
     * @default false
     * Whether the throw action key (E) is pressed for throwing bottles 
     */
    THROW = false;
}