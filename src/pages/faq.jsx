import { Disclosure } from "@headlessui/react"
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline"
import { motion as m, AnimatePresence } from "framer-motion"

export default function Faq() {
  return (
    <div className='bg-gray-900 h-full pb-24 md:pb-0'>
      <AnimatePresence>
        <div className='mx-auto max-w-7xl px-6 pt-12 sm:py-12 md:px-8 md:pb-48'>
          <div className='divide-y divide-white/10'>
            <h2 className='text-2xl font-bold leading-10 tracking-tight text-white'>
              Frequently asked questions
            </h2>
            <dl className='mt-10 space-y-6 divide-y divide-white/10 '>
              {faqs.map((faq, index) => (
                <Disclosure as='div' key={faq.question} className='pt-6'>
                  {({ open }) => (
                    <>
                      <m.div
                        key={faq.question}
                        initial='hidden'
                        animate='visible'
                        exit='hidden'
                        variants={cardVariantsVertical}
                        custom={index}
                        className=''>
                        <dt className='hover:bg-gray-800 transition ease-out p-2 rounded-md'>
                          <Disclosure.Button className='flex w-full items-start justify-between text-left text-white'>
                            <span className='text-base font-semibold leading-7'>
                              {faq.question}
                            </span>
                            <span className='ml-6 flex h-7 items-center'>
                              {open ? (
                                <MinusSmallIcon
                                  className='h-6 w-6'
                                  aria-hidden='true'
                                />
                              ) : (
                                <PlusSmallIcon
                                  className='h-6 w-6'
                                  aria-hidden='true'
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </dt>
                      </m.div>
                      <Disclosure.Panel as='dd' className='mt-2 pr-12'>
                        {faq.question ===
                        "What other features will be added in the future?" ? (
                          <ul className='list-disc pl-5 text-gray-300'>
                            <li>Daily meal plans.</li>
                            <li>Weekly meal plans.</li>
                            <li>Monthly meal plans.</li>
                            <li>
                              Personalized meal plans based on dietary
                              restrictions.
                            </li>
                            <li>
                              Ability to scale the recipe based on the number of
                              servings.
                            </li>
                            <li>
                              Chatbox so that you can ask ChatGPT any food
                              related questions!
                            </li>
                            <li>Ability to share via Social Media.</li>
                          </ul>
                        ) : (
                          <p className='text-base leading-7 text-gray-300 pl-4'>
                            {faq.answer}
                          </p>
                        )}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
        </div>
      </AnimatePresence>
    </div>
  )
}

const faqs = [
  {
    question: "How do I add food items to my pantry?",
    answer:
      "To add food items into your pantry, go to the pantry tab, type in your ingredient, select a category, and then press the Add button!",
  },
  {
    question: "How can I remove items from my pantry?",
    answer:
      "To remove items from your pantry, go to the Pantry page and locate the item you want to remove. Click on the Update button, click on the X icon on whichever ingredient, and it will be removed from your pantry.",
  },
  {
    question: "How do I select foods in the kitchen page?",
    answer:
      "On the Kitchen page, you can choose your ingredients by selecting category, ingredient, then pressing the Add button. Once you've selected the desired foods, click on the Generate Recipe button.",
  },
  {
    question: "How can I save the generated recipes?",
    answer:
      "After generating a recipe in the Kitchen page, there will be a Save Recipe button at the bottom of the recipe. This will allow you to store the recipe for future reference (where you can find it in the Saved Recipes tab).",
  },
  {
    question:
      "Can I add custom food items that are not in the predefined list?",
    answer:
      "Yes, you can add custom food items to your pantry. If the food item is not available in the predefined list, you can simply enter the name and select the Other category.",
  },
  {
    question:
      "Can I trust the accuracy and reliability of the recipes generated by ChatGPT?",
    answer:
      "ChatGPT strives to provide accurate and reliable recipes. However, it's important to note that the recipes generated by ChatGPT are based on patterns and information from a large dataset. While the model attempts to produce high-quality recipes, there may be occasional errors or inconsistencies. We recommend using the recipes generated by ChatGPT as a source of inspiration and double-checking specific instructions or ingredient quantities to ensure the best results.",
  },
  {
    question: "Can I use this website offline?",
    answer:
      "This website can only be used online because you are communicating with ChatGPT, which requires an internet connection.",
  },
  {
    question: "What other features will be added in the future?",
    answer:
      "The team at I'm Hungry is striving to add many features to this website. Such as daily, weekly, and monthly meal plans.",
  },
  {
    question: "How can I make suggestions for the website?",
    answer:
      "You can send an email to info@imhungry.com! We will gladly accept your feedback.",
  },
]

const cardVariantsVertical = {
  hidden: {
    y: 150,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
}
