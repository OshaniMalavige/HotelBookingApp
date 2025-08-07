import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/HomeView.vue')
    },
    {
        path: '/bookings',
        name: 'Booking',
        component: () => import('../views/Booking.vue')
    },
    {
        path: '/about',
        name: 'AboutUs',
        component: () => import('../views/AboutUs.vue')
    },
    {
        path: '/events',
        name: 'Events',
        component: () => import('../views/Events.vue')
    },
    {
        path: '/gallery',
        name: 'Gallery',
        component: () => import('../views/Gallery.vue')
    },
    {
        path: '/offers',
        name: 'Offers',
        component: () => import('../views/Offers.vue')
    },
    {
        path: '/rooms',
        name: 'Rooms',
        component: () => import('../views/Rooms.vue')
    },
    {
        path: '/services',
        name: 'Services',
        component: () => import('../views/Services.vue')
    },
    {
        path: '/contact',
        name: 'Contact Us',
        component: () => import('../views/Contact.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
