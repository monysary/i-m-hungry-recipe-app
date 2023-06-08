import Image from "next/image";
import { motion as m, AnimatePresence } from "framer-motion";
import pantry from "../../public/images/pantry.png";
import kitchen from "../../public/images/kitchen.png";
import {
  ArrowPathIcon,
  BanknotesIcon,
  CpuChipIcon,
  CursorArrowRaysIcon,
  GlobeAmericasIcon,
  CloudArrowUpIcon,
} from "@heroicons/react/20/solid";
import {
  BoltIcon,
  CalendarDaysIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import { motion as m, AnimatePresence, useAnimation } from 'framer-motion'

export default function LandingPage() {
  const mainControls = useAnimation()
  const featuresControls = useAnimation()
  return (
    <div className='bg-gray-800 h-full'>
      <AnimatePresence>
        <main>
          {/* Hero section */}
          <div className='relative isolate overflow-hidden'>
            <svg
              className='absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]'
              aria-hidden='true'>
              <defs>
                <pattern
                  id='983e3e4c-de6d-4c3f-8d64-b9761d1534cc'
                  width={200}
                  height={200}
                  x='50%'
                  y={-1}
                  patternUnits='userSpaceOnUse'>
                  <path d='M.5 200V.5H200' fill='none' />
                </pattern>
              </defs>
              <svg x='50%' y={-1} className='overflow-visible fill-gray-800/20'>
                <path
                  d='M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z'
                  strokeWidth={0}
                />
              </svg>
              <rect
                width='100%'
                height='100%'
                strokeWidth={0}
                fill='url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)'
              />
            </svg>
            <div
              className='absolute left-[calc(50%-4rem)]  -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]'
              aria-hidden='true'>
              <div
                className='aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20'
                style={{
                  clipPath:
                    "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
                }}
              />
            </div>
            <div className='mx-auto max-w-7xl px-6  sm:pb-40 lg:flex lg:px-8 lg:pt-24'>
              <m.div
                initial='hidden'
                animate='visible'
                viewport={{ once: true, amount: 0.8 }}
                className='flex flex-col md:flex-row'>
                <m.div
                  variants={cardVariantsVertical}
                  className='mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8'>
                  <div className='mt-12 sm:mt-32 lg:mt-16'>
                    <div className='inline-flex space-x-6'>
                      <span className='rounded-full bg-orange-500/10 px-3 py-1 text-sm font-semibold leading-6 text-orange-400 ring-1 ring-inset ring-orange-500/20'>
                        Free of Charge
                      </span>
                    </div>
                  </div>
                  <h1 className='mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl'>
                    Cook <span className='text-orange-600'> smarter</span>, not
                    harder
                  </h1>
                  <p className='mt-6 text-lg leading-8 text-gray-300'>
                    Say goodbye to home meal planning stress with tasty recipes
                    at your fingertips!
                  </p>
                  <div className='mt-10 flex items-center gap-x-6'>
                    <a
                      href='/signup'
                      className='rounded-md bg-orange-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400'>
                      Get started
                    </a>
                    <a
                      href='/signup'
                      className='text-sm font-semibold leading-6 text-white'>
                      Sign up <span aria-hidden='true'>→</span>
                    </a>
                  </div>
                </m.div>
                <m.div
                  variants={cardVariantsHorizontal}
                  className='mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32'>
                  <div className='max-w-3xl flex-none sm:max-w-5xl lg:max-w-none'>
                    <Image
                      src={kitchen}
                      alt='App screenshot'
                      width={2432}
                      height={1442}
                      className='w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10'
                    />
                  </div>
                </m.div>
              </m.div>
            </div>
          </div>

          {/* Feature section */}

          <m.div className='mx-auto max-w-7xl px-6 mb-24 md:mb-0 sm:mt-12 lg:px-8' >
            <m.div
              initial={{ opacity: 0, y: 150 }}
              animate={mainControls}
              onViewportEnter={() => { mainControls.start({ opacity: 1, y: 0 }) }}
              transition={{ type: 'spring', bounce: 0.4, duration: 0.8 }}
              className='mx-auto max-w-2xl text-center'>
              <h2 className='text-base font-semibold leading-7 text-orange-400'>
                Effortless planning
              </h2>
              <p className='mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl'>
                Everything you need to create delicious recipes
              </p>
              <p className='mt-6 text-lg leading-8 text-gray-300'>
                Experience the joy of effortless cooking, resourceful meal
                planning, and delightful flavors.
              </p>
            </m.div>
            <div className='mx-auto my-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none'>
              <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3'>
                {primaryFeatures.map((feature) => (
                  <m.div
                    initial={{ opacity: 0, y: 150 }}
                    animate={featuresControls}
                    onViewportEnter={() => { featuresControls.start({ opacity: 1, y: 0 }) }}
                    transition={{ type: 'spring', bounce: 0.4, duration: 0.8 }}
                    key={feature.name} className='flex flex-col'>
                    <dt className='text-base font-semibold leading-7 text-white'>
                      <div className='mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500'>
                        <feature.icon
                          className='h-6 w-6 text-white'
                          aria-hidden='true'
                        />
                      </div>
                      {feature.name}
                    </dt>
                    <dd className='mt-1 flex flex-auto flex-col text-base leading-7 text-gray-300'>
                      <p className='flex-auto'>{feature.description}</p>
                      <p className='mt-6'>
                        <a
                          href={feature.href}
                          className='text-sm font-semibold leading-6 text-orange-400'>
                          Learn more <span aria-hidden='true'>→</span>
                        </a>
                      </p>
                    </dd>
                  </m.div>
                ))}
              </dl>
            </div>
          </m.div>

          {/* Feature section */}
          <div className='mt-56 sm:mt-36'>
            <div className='mx-auto max-w-7xl px-6 lg:px-8'>
              <div className='mx-auto max-w-2xl sm:text-center'>
                <h2 className='text-base font-semibold leading-7 text-orange-400'>
                  Everything you need
                </h2>
                <p className='mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl'>
                  No food ideas? No problem.
                </p>
                <p className='mt-6 text-lg leading-8 text-gray-300'>
                  Let us take the lead on meal planning by helping you decide
                  what to cook based on ingredients you already have.
                </p>
              </div>
            </div>
            <div className='relative overflow-hidden pt-16'>
              <div className='mx-auto max-w-7xl px-6 lg:px-8'>
                <Image
                  src={pantry}
                  alt='App screenshot'
                  className='mb-[-12%] rounded-xl shadow-2xl ring-1 ring-white/10'
                  width={2432}
                  height={1442}
                />
                <div className='relative' aria-hidden='true'>
                  <div className='absolute -inset-x-20 bottom-0 bg-gradient-to-t from-gray-900 pt-[7%]' />
                </div>
              </div>
            </div>
            <div className='mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8'>
              <dl className='mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16'>
                {secondaryFeatures.map((feature) => (
                  <div key={feature.name} className='relative pl-9'>
                    <dt className='inline font-semibold text-white'>
                      <feature.icon
                        className='absolute left-1 top-1 h-5 w-5 text-orange-500'
                        aria-hidden='true'
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className='inline'>{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Stats */}
          <div className='mx-auto mt-24 max-w-7xl px-6 sm:mt-36 lg:px-8'>
            <div className='mx-auto max-w-2xl lg:mx-0 lg:max-w-xl'>
              <h2 className='text-base font-semibold leading-8 text-orange-400'>
                ChatGPT Algorithm
              </h2>
              <p className='mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl'>
                Trusted by thousands of developers&nbsp;worldwide
              </p>
              <p className='mt-6 text-lg leading-8 text-gray-300'>
                Your next dinner party is in good hands with the most powerful
                and popular AI tool in the world at your fingertips.
              </p>
            </div>
            <dl className='mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 text-white sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4'>
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className='flex flex-col gap-y-3 border-l border-white/10 pl-6'>
                  <dt className='text-sm leading-6'>{stat.name}</dt>
                  <dd className='order-first text-3xl font-semibold tracking-tight'>
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* CTA section */}
          <div className='relative isolate mt-0 px-6 py-24 sm:mt-24 sm:py-40 lg:px-8'>
            <svg
              className='absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]'
              aria-hidden='true'>
              <defs>
                <pattern
                  id='1d4240dd-898f-445f-932d-e2872fd12de3'
                  width={200}
                  height={200}
                  x='50%'
                  y={0}
                  patternUnits='userSpaceOnUse'>
                  <path d='M.5 200V.5H200' fill='none' />
                </pattern>
              </defs>
              <svg x='50%' y={0} className='overflow-visible fill-gray-800/20'>
                <path
                  d='M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z'
                  strokeWidth={0}
                />
              </svg>
              <rect
                width='100%'
                height='100%'
                strokeWidth={0}
                fill='url(#1d4240dd-898f-445f-932d-e2872fd12de3)'
              />
            </svg>
            <div
              className='absolute inset-x-0 top-10 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl'
              aria-hidden='true'>
              <div
                className='aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20'
                style={{
                  clipPath:
                    "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
                }}
              />
            </div>
            <div className='mx-auto max-w-2xl text-center'>
              <h2 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>
                Boost your meal plans.
                <br />
                Start using our app today.
              </h2>
              <p className='mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300'>
                No costs, no drawbacks, no problems. Get started by signing up
                today.
              </p>
              <div className='mt-10 flex items-center justify-center gap-x-6'>
                <a
                  href='/signup'
                  className='rounded-md bg-orange-600  px-3.5 py-2.5 text-sm font-semibold text-white-900 shadow-sm hover:bg-orange-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'>
                  Get started
                </a>
                <a
                  href='/signup'
                  className='text-sm font-semibold leading-6 text-white'>
                  Learn more <span aria-hidden='true'>→</span>
                </a>
              </div>
            </div>
          </div>
        </main>
      </AnimatePresence>
    </div>
  );
}

const primaryFeatures = [
  {
    name: "Instant meal planning",
    description:
      "Unlock the magic of your pantry with I'm Hungry, a revolutionary web app designed to transform your cooking experience. Say goodbye to meal planning struggles and unleash your culinary creativity effortlessly.",
    href: "/signup",
    icon: BoltIcon,
  },
  {
    name: "Powerful Algorithm",
    description:
      "How does I'm Hungry work? It's simple! All you need to do is input the recipes you have in your pantry, and our powerful ChatGPT algorithm will generate unique, delicious recipes tailored to your ingredients.",
    href: "/signup",
    icon: UsersIcon,
  },
  {
    name: "No more waste",
    description:
      "No more wasting food or wondering what to cook – I'm Hungry has got you covered. Whether you have a handful of basics or a diverse range of items, I'm Hungry makes the most of what you already have.",
    href: "/signup",
    icon: CalendarDaysIcon,
  },
];
const secondaryFeatures = [
  {
    name: "Save money",
    description:
      "No need to overstock on groceries when you can make delicious meals with what you have.",
    icon: BanknotesIcon,
  },
  {
    name: "Reduce waste",
    description:
      "Stop throwing away food and use your ingredients in ways you never imagined.",
    icon: GlobeAmericasIcon,
  },
  {
    name: "Fast results",
    description: "Instant meal generation backed by the power of AI.",
    icon: ArrowPathIcon,
  },
  {
    name: "Delicious recipes",
    description:
      "Become a chef and discover new mouthwatering flavors at the click of a button.",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Powerful AI.",
    description: "Leverage the most popular AI tool in the world.",
    icon: CpuChipIcon,
  },
  {
    name: "Save your favorites",
    description:
      "Never lose your favorite recipes ever again by saving them in the cloud.",
    icon: CloudArrowUpIcon,
  },
];
const stats = [
  { id: 1, name: "Different food recipes", value: "8,000+" },
  { id: 2, name: "Unlimited requests", value: "900m+" },
  { id: 3, name: "Uptime guarantee", value: "99.9%" },
  { id: 4, name: "Happy customers", value: "100%" },
];

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
};

const cardVariantsHorizontal = {
  hidden: {
    x: 150,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const cardVariantsChildren = {
  offscreen: {
    y: 150,
  },
  onscreen: {
    y: 0,

    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};
