This is a todo list project from The Odin Project

It is made using JavaScript and Webpack.

More than just a simple todo list, this app has the ability to create categories (like projects) and add items to the different categories. You can also set a priority of low, medium or high to each item.

I think I did ok making functions only available where they need to be but it still needs some refactoring to make it DRY and SOLID. And the the CSS can definitely be improved, when I polish it I want to use SCSS instead.

And I didn't add the functionality to edit an item's priority status or to have a "completed" option.

Another addition would be to add due dates to items.

In development I put 
devtool: 'eval-source-map',
in my webpack.config.js file to make debugging easier but I have removed it for "production".