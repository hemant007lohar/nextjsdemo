import Link from "next/link";
import Image from "next/image";
import numeral from "numeral";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBathtub, faBed, faCar, faDog } from "@fortawesome/free-solid-svg-icons";

export const PropertyCard = ({ title, destination, image, bedrooms, bathrooms, price, hasParking, petFriendly }) => {
    return (
        <Link href={destination}>
            <div className="border-2 border-slate-300 p-5 block bg-slate-100 hover:bg-slate-200 h-full">
                <div className="flex w-full"> 
                    <div className="relative w-full h-52">
                        <Image src={image} alt={title} layout="fill" className="object-cover" />                   
                    </div>
                </div>
                <div className="mt-3 text-lg font-bold">{title}</div>
                <div className="text-lg">£{numeral(price).format("0,0")}</div>
                <div className="flex justify-between text-sm mt-3">
                    <div>
                        <FontAwesomeIcon icon={faBathtub} />
                        <span className="pl-2">{bathrooms} Bathrooms</span>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faBed} />
                        <span className="pl-2">{bedrooms} Bedrooms</span>
                    </div>
                </div>

                {(hasParking || petFriendly) && <div className="flex justify-between text-sm mt-3">
                    {hasParking &&
                        <div>
                            <FontAwesomeIcon icon={faCar} />
                            <span className="pl-2">Parking Available</span>
                        </div>
                    }
                    {petFriendly &&
                        <div>
                            <FontAwesomeIcon icon={faDog} />
                            <span className="pl-2">Pet Friendly</span>                            
                        </div>
                    }
                </div>
                }                
            </div>
        </Link>  
    );
};
