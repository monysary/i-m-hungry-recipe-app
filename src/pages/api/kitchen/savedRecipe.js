// export default async function handler(req, res) {
//     addRecipe: async function (recipeData, id) {
//         try {
//             const user = await User.findByPk(id);
//             if (!user) {
//                 throw new Error("User not found");
//             }

//             const recipe = await SavedRecipe.create({
//                 ...recipeData,
//                 user_id: user.id,
//             });

//             return recipe;
//         } catch (err) {
//             console.log(err);
//             throw err;
//         }
//     },
//     updateRecipe: async function (recipeId, recipeData) {
//         try {
//             const recipe = await SavedRecipe.findByPk(recipeId);
//             if (!recipe) {
//                 throw new Error("Recipe not found");
//             }
//             await recipe.update(recipeData);
//             return recipe;
//         } catch (err) {
//             console.log(err);
//             throw err;
//         }
//     },
//     deleteRecipe: async function (recipeId) {
//         try {
//             const recipe = await SavedRecipe.findByPk(recipeId);
//             if (!recipe) {
//                 throw new Error("Recipe not found");
//             }
//             await recipe.destroy();
//             return recipe;
//         } catch (err) {
//             console.log(err);
//             throw err;
//         }
//     }

// }