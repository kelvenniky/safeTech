import { DriverStore, EmergencyStore, LocationStore, MarkerData } from "@/types/types/type";
import { create } from "zustand";

// Define the LocationStore
export const useLocationStore = create<LocationStore>((set) => ({
    userKey: null,
    userAddress: null,
    userLongitude: null,
    userLatitude: null,
    destinationLongitude: null,
    destinationLatitude: null,
    destinationAddress: null,
    destinationLocation: null,
    hospitalLocation:null,
    emergencyId:null,
    enroute:null,

    
    setUserLocation: ({
        latitude,
        longitude,
        address,
    }: {
        latitude: number;
        longitude: number;
        address: string;
    }) => {
        set(() => ({
            userLatitude: latitude,
            userLongitude: longitude,
            userAddress: address,
        }));
    },
    
    setDestinationLocation: ({
        userId,
        latitude,
        longitude,
        address,
        eId,
        route,
    }: {
        userId: number;
        latitude: number;
        longitude: number;
        address: string;
        eId:number;
        route:string
    }) => {
        set(() => ({
            userKey: userId,
            destinationLatitude: latitude,
            destinationLongitude: longitude,
            destinationAddress: address,
            emergencyId:eId,
            enroute:route,
            destinationLocation: { userId, latitude, longitude, address, eId, route },
        }));
    },
    setHospitalLocation: ({
        userId,
        latitude,
        longitude,
        address,
        eId,
        route,
    }: {
        userId: number;
        latitude: number;
        longitude: number;
        address: string;
        eId:number;
        route:string
    }) => {
        set(() => ({
            userKey: userId,
            destinationLatitude: latitude,
            destinationLongitude: longitude,
            destinationAddress: address,
            emergencyId:eId,
            enroute:route,
            hospitalLocation: { userId, latitude, longitude, address, eId, route },
        }));
    },
}));

// Define the DriverStore
export const useDriverStore = create<DriverStore>((set) => ({
    drivers: [] as MarkerData[],
    selectedDriver: null,
    
    setSelectedDriver: (driverId: number) => set(() => ({ selectedDriver: driverId })),
    setDrivers: (drivers: MarkerData[]) => set(() => ({ drivers })),
    clearSelectedDriver: () => set(() => ({ selectedDriver: null })),
}));



export const useEmergencyStore= create<EmergencyStore>((set) => ({
    emergencyStatus: null, // Initialize the emergency status
    setEmergencyStatus: (status) => set({ emergencyStatus: status }), // Function to update the status
  }));

