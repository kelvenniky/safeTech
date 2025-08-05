import cpr from '../assets/images/logos/cpr.png';
import stroke from '../assets/images/logos/heart.png';
import diabetes from '../assets/images/logos/diabetes.png';
import allergy from '../assets/images/logos/allergy.png';
import asthma from '../assets/images/logos/asthma.png';
import headInjury from '../assets/images/logos/headInjury.png';
import fire from '../assets/images/logos/fire.png';
import eyeInjury from '../assets/images/logos/eyeInjury.png';
import poison from '../assets/images/logos/poison.png';
import spine from '../assets/images/logos/bites.png';
import overdose from '../assets/images/logos/overdose.png';
import fracture from '../assets/images/logos/fracture.png';
import bites from '../assets/images/logos/bites.png';
import nosebleeds from '../assets/images/logos/nosebleeds.png';
import bleed from '../assets/images/logos/bleeding.png';
import sprain from '../assets/images/logos/sprain.png';
import heart from '../assets/images/logos/heart.png';
import wound from '../assets/images/logos/woundcare.png';
import seizure from '../assets/images/logos/seizure.png';
import shock from '../assets/images/logos/shock.png';
import choking from '../assets/images/logos/choking.png';
import hee from '../assets/images/logos/heart.png';



import faint from '../assets/images/logos/faint.png';
import sting from '../assets/images/logos/sting.png';
import pain from '../assets/images/logos/pain.png';
import heat from '../assets/images/logos/overheat.png';
import lats from '../assets/images/lats.png';
import hyp from '../assets/images/logos/hypothermia.png';
import obj from '../assets/images/logos/object.png';
import nau from '../assets/images/logos/nausea.png';
import fev from '../assets/images/logos/fever.png';
import fatigue from '../assets/images/logos/fatigue.png';
import drown from '../assets/images/logos/drown.png';
import cramps from '../assets/images/logos/cramps.png';
import cough from '../assets/images/logos/coughing.png';
import constipation from '../assets/images/logos/constipation.png';
import bite from '../assets/images/bites.png';
import sun from '../assets/images/sun.png';
import panic from '../assets/images/panic.png';






const firstAid = () => [
    {
        "id": 1,
        "title": "CPR",
        "logo": cpr,
        "steps": {
            "Adult": [
                "Check for danger",
                "Check victim's response to a shouted command & firm squeeze of shoulders",
                "Clear and open the airway",
                "If not breathing, begin CPR",
                "Give 30 chest compressions",
                "Give 2 rescue breaths",
                "Repeat until normal breathing returns or trained personnel arrive",
                "If breathing normally and there are signs of blood or vomit, turn the victim on the side to clear upper airway",
                "If conscious, make the victim comfortable"
            ],
            "Child": [
                "Check for danger",
                "Check victim's response to a shouted command & firm squeeze of shoulders",
                "Clear and open the airway",
                "If not breathing, begin CPR using one hand. Avoid head tilt",
                "Give 30 chest compressions",
                "Give 2 rescue breaths",
                "Repeat until normal breathing returns or trained personnel arrive",
                "If breathing normally and there are signs of blood or vomit, turn the victim on the side to clear upper airway",
                "If conscious, make the victim comfortable"
            ],
            "Baby": [
                "Check for danger",
                "Check victim's response to a shouted command & firm squeeze of shoulders",
                "Clear and open the airway",
                "If not breathing, begin CPR using two fingers. Avoid head tilt",
                "Give 30 chest compressions",
                "Give 2 rescue breaths",
                "Repeat until normal breathing returns or trained personnel arrive",
                "If breathing normally and there are signs of blood or vomit, turn the victim on the side to clear upper airway",
                "If conscious, make the victim comfortable"
            ]
        }
    },
    {
        "id": 2,
        "title": "Bleeding",
        "logo": bleed,
        "steps": [
            "Apply direct pressure quickly",
            "Raise & restrict movement of the injured limb",
            "Bandage pad firmly in place",
            "Do not remove or cut a foreign body",
            "Apply additional pad if leaking",
            "Reassure the victim",
            "Seek medical assistance"
        ]
    },
    {
        "id": 3,
        "title": "Burns",
        "logo": fire,
        "steps": [
            "Cool under running water",
            "Remove hot/wet clothing",
            "Remove jewellery and tight clothing",
            "Raise legs on the seat of a chair to boost circulation if the victim is pale and feeling unwell",
            "For large burn, cool the area. But not for too long to avoid hypothermia",
            "Apply dressing and light bandage",
            "Do not apply cream, ice or ointments"
        ]
    },
    {
        "id": 4,
        "title": "Choking",
        "logo": choking,
        "steps": {
            "Partial Obstruction": [
                "Reassure victim. Encourage victim to cough and breathe",
                "Monitor vital signs regularly",
                "If unconscious, begin CPR",
                "No back blows if breathing",
                "Seek medical attention"
            ],
            "Complete Obstruction": [
                "Give up to 5 back blows, checking victim for improvement after each one",
                "Give up to 5 chest thrusts",
                "Begin CPR",
                "Continue CPR",
                "Seek medical attention"
            ]
        }
    },
    {
        "id": 5,
        "title": "Bites",
        "logo": bites,
        "steps": {
            "Bee or Wasp Sting": [
                "Brush off bee or wasp barb",
                "Wash with soap and water",
                "Apply an ice pack",
                "Elevate limb",
                "Check for and treat known allergies"
            ],
            "Snake Bite": [
                "Still or lie the victim down and keep still",
                "Remove watch and jewellery",
                "Apply pressure bandage",
                "Splint and immobilise",
                "Reassure the victim and bring transport to them"
            ]
        }
    },
    {
        "id": 6,
        "title": "Poisons",
        "logo": poison,
        "steps": {
            "Conscious Victim": [
                "Check danger",
                "Clean up poison",
                "Avoid contaminating yourself",
                "Record poison details",
                "Seek medical assistance"
            ],
            "Unconscious Victim": [
                "Clear and open airway",
                "If not breathing, begin CPR",
                "Seek medical assistance"
            ]
        }
    },
    {
        "id": 7,
        "title": "Asthma",
        "logo": asthma,
        "steps": [
            "Help the victim to rest and calmly reassure",
            "Assist with prescribed medication",
            "Assist until ambulance arrives",
            "If the victim improves, keep at rest"
        ]
    },
    {
        "id": 8,
        "title": "Diabetes",
        "logo": diabetes,
        "steps": {
            "Low Blood Sugar": [
                "Stop exercising & rest, reassure victim",
                "Use glucose monitor (Glucometer)",
                "Give sugar if the victim is conscious & is able to swallow",
                "Condition should improve within 15 mins",
                "Once recovered, give longer-acting carbohydrates",
                "If no improvement & victim seizing or unconscious, seek medical help",
                "Monitor vital signs",
                "If trained administer glucagon to an unconscious victim or one unable to swallow"
            ],
            "High Blood Sugar": [
                "Use glucose monitor",
                "Assist victim to take or administer medication",
                "Encourage victim to drink enough water",
                "Seek medical assistance"
            ]
        }
    },
    {
        "id": 9,
        "title": "Drug Overdose",
        "logo": overdose,
        "steps": [
            "Risk assessment of victim & area",
            "Check for response",
            "Reassure the victim",
            "Identify the substance",
            "Monitor vital signs every few minutes for deterioration",
            "Maintain normal body temperature",
            "Dispose of needles/drugs properly",
            "Seek medical assistance"
        ]
    },
    {
        "id": 10,
        "title": "Eye Injury",
        "logo": eyeInjury,
        "steps": [
            "Do not remove any objects",
            "Do not rinse the eye",
            "Cover the eye with a clean cloth",
            "Seek medical assistance"
        ]
    },
    {
        "id": 11,
        "title": "Fractures",
        "logo": fracture,
        "steps": [
            "Check for wounds and apply a sterile dressing and pressure as required to control bleeding and keep bandage in place",
            "Immobilise and support injured limb",
            "Make the victim comfortable",
            "Treat to reduce shock",
            "Monitor vital signs",
            "Seek medical attention"
        ]
    },
    {
        "id": 12,
        "title": "Head Injury",
        "logo": headInjury,
        "steps": [
            "Check for response",
            "If unresponsive but breathing or partially responsive, place victim in recovery position",
            "If responsive, lie victim down with head slightly elevated",
            "Stop any bleeding",
            "Protect from hypothermia",
            "Monitor vital signs regularly",
            "Seek medical assistance"
        ]
    },
    {
        "id": 13,
        "title": "Heart Condition",
        "logo": hee,
        "steps": [
            "Check for symptoms of heart attack",
            "Assist the victim to rest",
            "Assist with prescribed medication",
            "Give aspirin 300mg if available",
            "Keep the victim calm and comfortable",
            "Monitor vital signs regularly",
            "Seek medical assistance"
        ]
    },
    {
        "id": 14,
        "title": "Spinal Injury",
        "logo": spine,
        "steps": [
            "If unconscious, clear airway",
            "If conscious, hold head still",
            "If in water, stay and support",
            "Treat injuries without movement",
            "Maintain body temperature",
            "After road accidents, children in car seats should remain there but seat should be removed from the car if possible",
            "Rest and reassure the victim",
            "Monitor vital signs",
            "Seek medical assistance"
        ]
    },
    {
        "id": 15,
        "title": "Nosebleed",
        "logo": nosebleeds,
        "steps": [
            "Sit upright with head slightly tilted forward. Do not swallow blood",
            "Pinch just below bridge of nose and hold constantly for at least 15 mins. Breathe through the mouth",
            "Loosen tight clothing around the neck",
            "Apply wrapped ice pack on forehead and back of neck",
            "Remove pressure after 15 mins and check to see if bleeding has stopped",
            "If bleeding persists, seek medical attention",
            "Reapply pressure while waiting for ambulance"
        ]
    },
    {
        "id": 16,
        "title": "Seizure",
        "logo": seizure,
        "steps": [
            "Protect the victim from injury",
            "Stay with the victim, loosen clothing",
            "For children, place a soft surface on their back or side. Remove clothing down to diapers and check temperature once seizure ends",
            "Roll victim into recovery position after seizure",
            "Reassure the victim",
            "Monitor vital signs regularly",
            "Seek medical advice"
        ]
    },
    {
        "id": 17,
        "title": "Electric Shock",
        "logo": shock,
        "steps": [
            "Turn off power source or remove victim from source using non-conductive material",
            "Be aware of water surrounding victim",
            "With power lines in contact with a car, remain at least 8m away. Reassure the victim and ask them not to move",
            "If not responding or breathing, begin CPR",
            "Cool any burns with running water for 20 mins",
            "Remove jewellery and clothes from burnt area",
            "Cover with non-adherent dressing and loose bandage",
            "Seek medical attention"
        ]
    },
    {
        "id": 18,
        "title": "Stroke",
        "logo": stroke,
        "steps": [
            "Check the victim's face, arm, speech and call at once",
            "Assess level of consciousness. Begin CPR if unconscious and not breathing. If unconscious but breathing, place in recovery position, otherwise assist into a comfortable position",
            "Monitor vital signs regularly",
            "Seek medical assistance"
        ]
    },
    {
        "id": 19,
        "title": "Sprains & Strains",
        "logo": sprain,
        "steps": [
            "Assist the victim to be comfortable",
            "Rest and elevate an injured limb",
            "Apply a compression bandage",
            "Apply ice pack for up to 20 mins",
            "Reapply compression bandage",
            "Continue to elevate the limb and avoid use for 48 hours",
            "Seek medical assistance"
        ]
    },
    {
        "id": 20,
        "title": "Wound Care",
        "logo": wound,
        "steps": [
            "Stop bleeding",
            "Wash hands and use gloves",
            "Clean wound with saline or clean water",
            "Apply and secure sterile dressing",
            "Seek medical assistance",
            "Dispose of gloves and dressings"
        ]
    },
    {
        "id": 21,
        "title": "Fainting",
        "logo":faint,
        "steps": [
            "Lay the victim down on their back",
            "Elevate the legs",
            "Check for breathing",
            "Loosen any tight clothing",
            "Seek medical assistance if necessary"
        ]
    },
    {
        "id": 22,
        "title": "Hypothermia",
        "logo": hyp,
        "steps": [
            "Move the victim to a warm area",
            "Remove wet clothing",
            "Wrap the victim in warm blankets",
            "Provide warm beverages if conscious",
            "Seek medical assistance"
        ]
    },
    {
        "id": 23,
        "title": "Heat Stroke",
        "logo": sun,
        "steps": [
            "Call emergency services immediately",
            "Move the victim to a cooler place",
            "Apply cool cloths to the body",
            "Loosen tight clothing",
            "Monitor vital signs"
        ]
    },
    {
        "id": 24,
        "title": "Animal Bites",
        "logo": bite,
        "steps": [
            "Wash the bite area immediately with soap and water",
            "Apply an antibiotic ointment",
            "Cover with a clean bandage",
            "Seek medical attention if necessary"
        ]
    },
    {
        "id": 25,
        "title": "Sunburn",
        "logo": heat,
        "steps": [
            "Cool the burn under running water",
            "Apply aloe vera or a moisturizing lotion",
            "Stay hydrated",
            "Seek medical assistance if severe"
        ]
    },
    {
        "id": 26,
        "title": "Insect Stings",
        "logo": sting,
        "steps": [
            "Remove the stinger if present",
            "Wash the area with soap and water",
            "Apply a cold pack to reduce swelling",
            "Seek medical assistance if allergic reaction occurs"
        ]
    },
    {
        "id": 27,
        "title": "Cuts",
        "logo": lats,
        "steps": [
            "Apply direct pressure to stop bleeding",
            "Clean the wound with water",
            "Apply a sterile dressing",
            "Seek medical assistance if necessary"
        ]
    },
    {
        "id": 28,
        "title": "Constipation ",
        "logo":constipation,
        "steps": [
            "Encourage fluid intake",
            "Suggest high-fiber foods",
            "Consider over-the-counter remedies",
            "Seek medical advice if severe"
        ]
    },
    {
        "id": 29,
        "title": "Cramps",
        "logo":cramps,
        "steps": [
            "Stretch the affected muscle gently",
            "Apply heat or cold to relieve pain",
            "Stay hydrated",
            "Seek medical assistance if cramps persist"
        ]
    },
    {
        "id": 30,
        "title": " Allergic Reaction",
        "logo":cramps,
        "steps": [
            "Call emergency services immediately",
            "Administer epinephrine if available",
            "Keep the victim calm and comfortable",
            "Monitor vital signs until help arrives"
        ]
    },
    {
        "id": 31,
        "title": "Panic Attack",
        "logo": panic,
        "steps": [
            "Reassure the victim and help them breathe slowly",
            "Encourage them to focus on their breathing",
            "Seek medical assistance if necessary"
        ]
    },
    {
        "id": 32,
        "title": "Drowning",
        "logo": drown,
        "steps": [
            "Call emergency services immediately",
            "Perform CPR if the victim is not breathing",
            "Check for responsiveness and breathing",
            "Seek medical assistance"
        ]
    },
    {
        "id": 33,
        "title": "Chronic Pain",
        "logo":pain,
        "steps": [
            "Encourage rest and relaxation",
            "Apply heat or cold to the affected area",
            "Suggest over-the-counter pain relief",
            "Seek medical advice if severe"
        ]
    },
    {
        "id": 34,
        "title": " Object in Eye",
        "logo": obj,
        "steps": [
            "Do not rub the eye",
            "Flush the eye with clean water",
            "Seek medical assistance if object remains"
        ]
    },
    {
        "id": 35,
        "title": "Overheating",
        "logo": fev,
        "steps": [
            "Move to a cooler environment",
            "Drink cool fluids",
            "Loosen tight clothing",
            "Seek medical assistance if symptoms worsen"
        ]
    },
    {
        "id": 36,
        "title": "Coughing Fit",
        "logo": cough,
        "steps": [
            "Encourage the victim to stay calm",
            "Offer water to drink",
            "Seek medical assistance if it persists"
        ]
    },
    {
        "id": 37,
        "title": "High Fever",
        "logo": fev,
        "steps": [
            "Monitor the victim's temperature",
            "Give fever-reducing medication if necessary",
            "Encourage fluid intake",
            "Seek medical assistance if fever persists"
        ]
    },
    {
        "id": 38,
        "title": "Fatigue",
        "logo": fatigue,
        "steps": [
            "Encourage rest and hydration",
            "Provide a comfortable environment",
            "Seek medical advice if fatigue persists"
        ]
    },
    {
        "id": 39,
        "title": "Nausea",
        "logo": nau,
        "steps": [
            "Encourage the victim to sit or lie down",
            "Offer ginger tea or clear fluids",
            "Seek medical assistance if persistent"
        ]
    },
    {
        "id": 40,
        "title": "Sleep Disturbance",
        "logo": faint,
        "steps": [
            "Create a relaxing environment",
            "Encourage good sleep hygiene",
            "Consider relaxation techniques",
            "Seek medical advice if severe"
        ]
    }
];

export default firstAid;