class Food {                            // Food class - this contains the specific foods within the food type class
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    
    describe() {
        return `${this.name}s are ${this.price}.`
    }
}

class FoodType {                        // Food Type Class - this can contain food types like breakfast, lunch, dinner, appetizers, or even chinese vs mexican
    constructor(name) {
        this.name = name;
        this.foods = [];
    }


    addFood(food) {                     // This adds a food item into the foods array
        if (food instanceof Food) {
            this.foods.push(food);
        } else {
            throw new Error(`You can only add an instance of Food. Argument is not a food: ${food}`);
        }
    }

    describe() {
        return `${this.name} has ${this.foods.length} items on the menu.`;
    }
}    

class Menu {                                // This Menu Class is to view the initial menu options, which give the options of creating, viewing, deleting, or displaying food types. 
    constructor() {
        this.foodTypes = [];
        this.selectedFoodType = null;
    }

    start() {                               // This portion indicates where to start the selection, and depending on what number is entered, selecting that appropriate item.
        let selection = this.showMainMenuOptions();

        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createFoodType();
                    break;
                case '2':
                    this.viewFoodType();
                    break;
                case '3':
                    this.deleteFoodType();
                    break;
                case '4':
                    this.displayFoodTypes();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert('Goodbye!');
    }

    showMainMenuOptions() {                 // This displays the main menu options
        return prompt(`
        0) exit
        1) create new food type
        2) view food type
        3) delete food type
        4) display all food types
        `);
    }

    showFoodTypeMenuOptions(foodTypeInfo) {         // This shows the menu options within a food type
        return prompt(`
        0) back
        1) create food
        2) delete food

        ---------------------

        ${foodTypeInfo}
        `);
    }

    displayFoodTypes() {                            // This shows each food type that was created
        let foodTypeString = '';
        for (let i = 0; i < this.foodTypes.length; i++) {
            foodTypeString += i + ') ' + this.foodTypes[i].name + '\n';
        }
        alert(foodTypeString);
    }

    createFoodType() {                              // This creates a food type
        let name = prompt(`Enter name for new food type: `);
        this.foodTypes.push(new FoodType(name));
    }

    viewFoodType() {                                    // This prompts the user to enter the index of the food type they would like to view, as well as shows the specifc food types and the prices attached to each
        let index = prompt(`Enter the index of the food type you wish to view: `);
        if (index > -1 && index < this.foodTypes.length) {
            this.selectedFoodType = this.foodTypes[index];
            let description = 'Food Type Name: ' + this.selectedFoodType.name + '\n';

            for (let i = 0; i < this.selectedFoodType.foods.length; i++) {
                description += i + ') ' + this.selectedFoodType.foods[i].name + ' - ' + this.selectedFoodType.foods[i].price + '\n';
            }

            let selection = this.showFoodTypeMenuOptions(description) 
                switch (selection ) {
                case '1':
                    this.createFood();
                    break;
                case '2':
                    this.deleteFood();    
            }
        }
    }

    deleteFoodType() {                                  // This deletes a food type
        let index = prompt(` Enter the index of the food type you wish to delete: `);
        if (index > -1 && index < this.foodTypes.length) {
            this.foodTypes.splice(index, 1);
        }
    }

    createFood() {                                      // This creates a new food
        let name = prompt(`Enter name for new food: `);
        let price = prompt(`Enter price for new food: `);
        this.selectedFoodType.foods.push(new Food(name, price));

    }
    
    deleteFood() {                                          // This deletes a specific food within the food type selected
        let index = prompt(`Enter the index of the food you wish to delete: `);
        if (index > -1 && index < this.selectedFoodType.foods.length) {
            this.selectedFoodType.foods.splice(index, 1);
        }
    }

}


let menu = new Menu()
menu.start()