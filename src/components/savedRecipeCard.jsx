import { useEffect, useRef, useState, Fragment } from "react";
import authService from "@/utils/auth/authService";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import SuccessNotification from "./alerts/successNotification";
import getTimeAgo from "@/utils/getTimeAgo";

export default function SavedRecipeCard({ myRecipes, setToggle }) {
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState([]);
  const [success, setSuccess] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  
  useEffect(() => {
    const isIndeterminate =
      selectedRecipe.length > 0 && selectedRecipe.length < myRecipes?.length;
    setChecked(selectedRecipe.length === myRecipes?.length);
    setIndeterminate(isIndeterminate);
    checkbox.current.indeterminate = isIndeterminate;
  }, [selectedRecipe]);

  function toggleAll() {
    setSelectedRecipe(checked || indeterminate ? [] : myRecipes);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  const handleDeleteButton = async () => {
    try {
      const response = await fetch(
        `/api/savedRecipe?ids=${selectedRecipe
          .map((recipe) => recipe.id)
          .join(",")}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: authService.getToken(),
          },
        }
      );
      const data = await response.json();
      console.log(data.message);
    } catch (err) {
      console.log(err);
    } finally {
      setToggle((prev) => !prev);
      toggleAll();
    }
  };
  // Open recipe modal
  const [open, setOpen] = useState(false);
  const [recipeModal, setRecipeModal] = useState(undefined);
  const handleOpenModal = (recipe) => {
    setRecipeModal(recipe);
    setOpen(true);
  };

  // Modal edit mode
  const [editMode, setEditMode] = useState(false);
  const handleEditButton = () => {
    setEditMode((prev) => !prev);
  };
  useEffect(() => {
    if (!open) {
      setEditMode(false);
    }
  }, [open]);

  console.log(recipeModal)

  const handleRecipeChange = ({ target: { name, value } }, item) => {
    switch (name.split(" ")[0]) {
      case "ingredients":
        const inputName = name.split(" ")[1];
        const ingredientIndex = recipeModal.ingredients.findIndex(
          (object) => object[inputName] === item[inputName]
        );
        const ingredientsArr = [...recipeModal.ingredients];
        ingredientsArr[ingredientIndex] = {
          ...ingredientsArr[ingredientIndex],
          [inputName]: value,
        };
        setRecipeModal({ ...recipeModal, ingredients: ingredientsArr });
        break;

      case "instructions":
        const instructionIndex = recipeModal.instructions.indexOf(item);
        const instructionsArr = [...recipeModal.instructions];
        instructionsArr[instructionIndex] = value;
        setRecipeModal({ ...recipeModal, instructions: instructionsArr });
        break;

      default:
        setRecipeModal({ ...recipeModal, [name]: value });
        break;
    }
  };

  // Handle save button
  const handleSaveButton = async () => {
    try {
      const response = await fetch(`/api/savedRecipe?id=${recipeModal.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authService.getToken(),
        },
        body: JSON.stringify({
          ...recipeModal,
          ingredients: JSON.stringify(recipeModal.ingredients),
          instructions: JSON.stringify(recipeModal.instructions),
        }),
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    } finally {
      setEditMode(false);
      setToggle((prev) => !prev);
    }
  };

  // post recipe to feed timeline
  async function handlePostToFeed(id) {
    try {
      setSuccess(false)
      const response = await fetch(`/api/savedRecipe?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authService.getToken(),
        },
        body: JSON.stringify({
          ...recipeModal,
          postedToTimeline: !recipeModal.postedToTimeline,
        }),
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    } finally {
      setRecipeModal((prev) => ({
        ...prev,
        postedToTimeline: !recipeModal.postedToTimeline, // Update the state with the new value
      }));
      setShareSuccess(true);
    }
  }

  return (<>

    <div className='px-2 sm:px-6'>
      <div className='mt-4 flow-root'>
        <div className='-mx-4 -my-2 sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 '>
            <div className='relative'>
              {selectedRecipe.length > 0 && (
                <div className='absolute left-14 top-0 flex h-12 items-center space-x-3 bg-white sm:left-12'>
                  <button
                    type='button'
                    onClick={handleDeleteButton}
                    className='inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white'>
                    <TrashIcon className='h-6 w-6' />
                  </button>
                </div>
              )}
              <table className='w-full table-fixed divide-y divide-gray-300'>
                <thead className='w-full'>
                  <tr>
                    <th scope='col' className='relative px-7 w-12 sm:px-6'>
                      <input
                        type='checkbox'
                        className='absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600'
                        ref={checkbox}
                        checked={checked}
                        onChange={toggleAll}
                      />
                    </th>
                    <th
                      scope='col'
                      className={`w-auto py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 
                      ${selectedRecipe.length > 0 && "invisible"}
                    `}>
                      Name
                    </th>
                    <th
                      scope='col'
                      className='hidden lg:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:w-[10%]'>
                      Servings
                    </th>
                    <th
                      scope='col'
                      className='hidden sm:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:w-[25%]'>
                      Ingredients
                    </th>
                    <th
                      scope='col'
                      className='hidden lg:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:w-[25%]'>
                      Instructions
                    </th>
                    <th
                      scope='col'
                      className='relative py-3.5 pl-3 pr-4 sm:pr-3 sm:w-[18%] md:w-[10%]'>
                      <span className='sr-only'>Edit</span>
                    </th>
                  </tr>

                </thead>
                <tbody className='divide-y divide-gray-200 bg-white'>
                  {myRecipes?.map((recipe) => (
                    <tr
                      key={recipe.id}
                      className={classNames(
                        "",
                        selectedRecipe.includes(recipe)
                          ? "bg-gray-50"
                          : 'hover:bg-gray-100 transition ease-out'
                      )}>
                      <td className='relative px-7 w-12 sm:px-6'>
                        {selectedRecipe.includes(recipe) && (
                          <div className='absolute inset-y-0 left-0 w-0.5 bg-blue-600' />
                        )}
                        <input
                          type='checkbox'
                          className='absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600'
                          value={recipe.title}
                          checked={selectedRecipe.includes(recipe)}
                          onChange={(e) =>
                            setSelectedRecipe(
                              e.target.checked
                                ? [...selectedRecipe, recipe]
                                : selectedRecipe.filter((p) => p !== recipe)
                            )
                          }
                        />
                      </td>
                      <td
                        className={classNames(
                          "w-auto py-4 pr-3 text-sm font-medium truncate",
                          selectedRecipe.includes(recipe)
                            ? "text-blue-600"
                            : "text-gray-900"
                        )}>
                        {recipe.title}
                      </td>
                      <td className='hidden lg:table-cell px-3 py-4 text-sm text-gray-500'>
                        {recipe.servings}
                      </td>
                      <td className='hidden sm:table-cell px-3 py-4 text-sm text-gray-500 truncate'>
                        {recipe.ingredients
                          .map((ingredient) => ingredient.name)
                          .join(", ")}
                      </td>
                      <td className='hidden lg:table-cell px-3 py-4 text-sm text-gray-500 truncate'>
                        {recipe.instructions
                          .map((instruction) => instruction)
                          .join(", ")}
                      </td>
                      <td className='py-4 sm:pl-3 pr-4 text-right text-sm font-medium sm:pr-3'>
                        <button
                          type='button'
                          onClick={() => handleOpenModal(recipe)}
                          className='rounded-md sm:ml-0 text-gray-900 bg-white shadow-sm hover:bg-gray-50 transition ease-out ring-1 ring-inset ring-gray-300 font-semibold text-sm px-2.5 py-1.5'>
                          View<span className='sr-only'>{recipe.title}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          <div className='fixed inset-0 z-10 overflow-y-auto'>
            <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
                <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-screen-md sm:p-6'>
                  <div>
                    <div className='px-4 sm:px-0'>
                      {editMode ? (
                        <>
                          {recipeModal?.createdAt != recipeModal?.updatedAt && <p className='italic text-sm text-gray-600 mb-2'>last edited {getTimeAgo(recipeModal?.updatedAt)}</p>}
                          <input
                            placeholder='Recipe Name'
                            name='title'
                            onChange={handleRecipeChange}
                            value={recipeModal && recipeModal.title}
                            className='w-full sm:w-1/2 text-[25px] rounded-md outline-0 border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600'
                          />
                        </>
                      ) : (
                        <div className='flex flex-col gap-2 mb-2 md:mb-0'>
                          <p className='italic text-sm text-gray-600'> added {getTimeAgo(recipeModal?.createdAt)}</p>
                          <div className='flex flex-col gap-4 md:gap-0 md:flex-row justify-between'>
                            <h3 className='text-[25px] font-semibold leading-7 text-gray-900'>
                              {recipeModal?.title}
                            </h3>
                            {!recipeModal?.postedToTimeline ? (
                              <button
                                type='button'
                                onClick={() => handlePostToFeed(recipeModal?.id)}
                                className='rounded-md sm:ml-0  text-gray-900 bg-white shadow-sm hover:bg-gray-50 transition ease-out ring-1 ring-inset ring-gray-300 font-semibold text-sm px-2.5 py-1.5'>
                                Share to feed
                                <span className='sr-only'>
                                  {recipeModal?.title}
                                </span>
                              </button>) : (
                              <button
                                type='button'
                                onClick={() => handlePostToFeed(recipeModal?.id)}
                                className='rounded-md sm:ml-0 text-gray-900 bg-white shadow-sm hover:bg-gray-50 transition ease-out ring-1 ring-inset ring-gray-300 font-semibold text-sm px-2.5 py-1.5'>
                                Unshare
                                <span className='sr-only'>
                                  {recipeModal?.title}
                                </span>
                              </button>
                              )
                            }
                          </div>
                          
                          {shareSuccess && recipeModal.postedToTimeline === true && <div className=''> <SuccessNotification title='Successfully shared!' message='View your publicly shared post on the feed.' btnTitle='View post' href='/feed' /> </div>}
                          {shareSuccess && recipeModal.postedToTimeline === false && <div className=''> <SuccessNotification title='Removed post from feed!' message='The recipe is no longer publicly available'  /> </div>}
                        </div>
                      )}
                      {editMode ? (
                        <div className='flex items-center mt-1 max-w-2xl text-sm leading-6 text-gray-600'>
                          <div className='mr-1'>Servings:</div>
                          <input
                            placeholder='Serving Size'
                            type='number'
                            name='servings'
                            onChange={handleRecipeChange}
                            value={recipeModal && recipeModal.servings}
                            className='w-1/2 sm:w-1/4 block mt-1 text-sm rounded-md outline-0 border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600'
                          />
                        </div>
                      ) : (
                        <p className='mt-1 max-w-2xl text-sm font-medium leading-6 text-gray-600'>
                          Servings: {recipeModal?.servings}
                        </p>
                      )}
                    </div>
                    <div className='mt-6 border-t border-gray-200'>
                      <dl className='divide-y divide-gray-200'>
                        <div className='px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                          <dt className='text-sm font-medium leading-6 text-gray-900'>
                            Ingredients
                          </dt>
                          <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                            {editMode
                              ? recipeModal &&
                              recipeModal.ingredients.map((item) => {
                                const index =
                                  recipeModal.ingredients.findIndex(
                                    (x) => x === item
                                  );
                                return (
                                  <div
                                    key={index}
                                    className='flex justify-between items-center w-full'>
                                    <input
                                      placeholder='Ingredient'
                                      name='ingredients name'
                                      onChange={() =>
                                        handleRecipeChange(event, item)
                                      }
                                      value={recipeModal && item.name}
                                      className='mt-1 w-[33%] text-sm rounded-md outline-0 border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600'
                                    />
                                    <input
                                      placeholder='Amount'
                                      type='number'
                                      name='ingredients amount'
                                      onChange={() =>
                                        handleRecipeChange(event, item)
                                      }
                                      value={recipeModal && item.amount}
                                      className='mt-1 w-[33%] text-sm rounded-md outline-0 border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600'
                                    />
                                    <input
                                      placeholder='Unit'
                                      name='ingredients unit'
                                      onChange={() =>
                                        handleRecipeChange(event, item)
                                      }
                                      value={recipeModal && item.unit}
                                      className='mt-1 w-[33%] text-sm rounded-md outline-0 border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600'
                                    />
                                  </div>
                                );
                              })
                              : recipeModal &&
                              recipeModal.ingredients.map((item) => {
                                return (
                                  <p key={item.name}>
                                    -{" "}
                                    {item.name} <span className='italic'>({item.amount} {item.unit})</span>
                                    <br />
                                  </p>
                                );
                              })}
                          </dd>
                        </div>
                        <div className='px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                          <dt className='text-sm font-medium leading-6 text-gray-900'>
                            Instructions
                          </dt>
                          <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                            {editMode
                              ? recipeModal &&
                              recipeModal.instructions.map((item) => {
                                const index =
                                  recipeModal.instructions.findIndex(
                                    (x) => x === item
                                  );
                                return (
                                  <div
                                    key={index}
                                    className='flex justify-center items-center gap-1'>
                                    <p>
                                      {recipeModal.instructions.indexOf(
                                        item
                                      ) + 1}
                                      .{" "}
                                    </p>
                                    <input
                                      placeholder='Instruction'
                                      name='instructions'
                                      onChange={() =>
                                        handleRecipeChange(event, item)
                                      }
                                      value={recipeModal && item}
                                      className='mt-1 w-full text-sm rounded-md outline-0 border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600'
                                    />
                                  </div>
                                );
                              })
                              : recipeModal &&
                              recipeModal.instructions.map((item) => {
                                return (
                                  <p key={item}>
                                    {recipeModal.instructions.indexOf(item) +
                                      1}
                                    . {item}
                                    <br />
                                  </p>
                                );
                              })}
                          </dd>
                        </div>
                        <div className='px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                          <dt className='text-sm font-medium leading-6 text-gray-900'>
                            Notes
                          </dt>
                          <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                            {editMode ? (
                              <textarea
                                placeholder='Click edit to add notes'
                                name='notes'
                                onChange={handleRecipeChange}
                                value={
                                  recipeModal?.notes
                                    ? recipeModal.notes
                                    : undefined
                                }
                                className='mt-1 w-full text-sm rounded-md outline-0 border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600'
                              />
                            ) : (
                              <p>
                                {recipeModal?.notes
                                  ? recipeModal.notes
                                  : "Click edit to add notes"}
                              </p>
                            )}
                          </dd>
                        </div>
                      </dl>
                    </div>
                    {editMode ? (
                      <div className='flex justify-end items-center gap-1'>
                        <button
                          type='button'
                          className='font-medium rounded-lg text-sm px-5 py-2.5'
                          onClick={() => setEditMode(false)}>
                          Cancel
                        </button>
                        <button
                          type='button'
                          className='text-white bg-teal-400 hover:bg-teal-500 font-medium rounded-lg text-sm px-5 py-2.5'
                          onClick={handleSaveButton}>
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className='flex justify-end items-center gap-1'>
                        <button
                          type='button'
                          className='font-medium rounded-lg text-sm px-5 py-2.5 border hover:bg-gray-50 transition ease-out'
                          onClick={() => setOpen(false)}>
                          Close
                        </button>
                        <button
                          type='button'
                          className='ml-[10px] sm:ml-0 text-white bg-yellow-400 hover:bg-yellow-500 transition ease-out font-medium rounded-lg text-sm px-5 py-2.5'
                          onClick={handleEditButton}>
                          Edit
                        </button>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div></>
  );
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
