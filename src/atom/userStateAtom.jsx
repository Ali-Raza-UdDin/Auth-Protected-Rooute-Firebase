import { atom } from 'jotai'
import { auth } from "../firebase"

export const userStateAtom = atom({
    loading: true,
    user: null
})

userStateAtom.onMount = (set)  => {
    console.log("onMount")
    const unsubscribe = auth.onAuthStateChanged((user) => {
        set({
            loading: false,
            user
        })
    return () => {
        console.log("onUnmount")
        unsubscribe()
    }
    })
}