import { Button } from "./button"
import { SubItem } from "./subItem"

export const ProfilItem = ({className}: {className: string}) => {
    return <div className={` bg-gray-900 border-gray-800 mt-2 relative rounded-2xl ${className}`}>
    <div className="h-[250px] rounded-t-2xl bg-red-300"></div>
    <div className="mb-[45px] p-2">
        <p className="text-[12px] text-gray-300 text-center">
            bio Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Rem ad
        </p>
        <div className="flex flex-wrap text-gray-300">
            <SubItem title={"NextJs"}/>
            <SubItem title={"Java"}/>
            <SubItem title={"ReactJs"}/>
            <SubItem title={"Tailwindcss"}/>
        </div>
    </div>
    <div className="absolute bottom-1 left-2 right-2 h-[35px]">
        <Button className="bg-green-700 h-[30px] rounded-2xl text-white w-full">Available Now</Button>
    </div>
</div>
}