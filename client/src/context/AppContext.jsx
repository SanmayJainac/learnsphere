import { createContext,useState,useEffect} from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext()

export const AppContextProvider= (props)=>{
    const currency=import.meta.env.VITE_CURRENCY
    const navigate= useNavigate()

    const [allCourses , setAllCources] = useState([])
    const [isEducator , setIsEducator] = useState(true)
    const [enrolledCourses , setEnrolledCourses] = useState([])

    //fetch all cources
    const fetchAllCources= async()=>{
        setAllCources(dummyCourses)
    }

    //function to calculate average rating of the course
    const calculateRating= (course)=>{
        if(!course.courseRatings ||course.courseRatings.length===0){
            return 0;
        }
        let totalRating=0;
        course.courseRatings.forEach((rating)=>{
            totalRating+=rating.rating;
        })
        return totalRating/course.courseRatings.length
    
    }

    //function to calculate course chapter time
    const calculateChapterTime= (chapter)=>{
        let time=0;
        chapter.chapterContent.map((lecture)=> time+=lecture.lectureDuration)
        return humanizeDuration(time*60*1000,{units: ["h", "m", ]})
    }

    //function to calculate the course duration
    const calculateCourseDuration= (course)=>{
        let time=0;
        course.courseContent.map((chapter)=> chapter.chapterContent.map(
            (lecture)=> time+=lecture.lectureDuration
        ))
        return humanizeDuration(time*60*1000,{units: ["h", "m", ]})
    
    }

    //function to calculate the no of lecture in the course
    const calculateNoOfLecture= (course)=>{
        let totalLectures=0;
        course.courseContent.forEach((chapter)=> {
            if(Array.isArray(chapter.chapterContent)){
                totalLectures+=chapter.chapterContent.length
            
            }

        });
        return totalLectures
    }

    //fetch userenrolled courses
    const fetchUserEnrolledCourses= async()=>{
        setEnrolledCourses(dummyCourses)
    }

    useEffect(()=>{
        fetchAllCources()
        fetchUserEnrolledCourses()

    },[])

    const value = {
        currency,allCourses,navigate,calculateRating,
        isEducator,setIsEducator,calculateChapterTime,
        calculateCourseDuration,calculateNoOfLecture,enrolledCourses,fetchUserEnrolledCourses

    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
} 