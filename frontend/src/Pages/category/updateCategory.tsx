import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { type categoryType, type UpdateCategoryType } from "./categoryType";
import { updateCategoryApi } from "@/services/CategoryService";
import CategoryIcons from "@/components/icons/CategoryIcons";

type UpdateCategoryProps = {
    category: categoryType | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
     onCategoryAdded: () => void;
};

function updateCategory({
    category,
    open,
    onOpenChange,
    onCategoryAdded
}: UpdateCategoryProps) {

    const isMobile = useIsMobile();
    const swipeDirection = isMobile ? "down" : "right";

    const [ updatedCategoryIconId, setUpdateCategoryIconId ] = useState("");
    const [ updatedCategoryName, setUpdateCategoryName ] = useState("");

    useEffect(() => {
        if (open && category) {
            setUpdateCategoryName(category.categoryName);
            setUpdateCategoryIconId(String(category.categoryIconId));
        }
    }, [open, category]);

    async function handleSaveButton() {
        if (!category) return;

        const data: UpdateCategoryType = {
            categoryName: updatedCategoryName,
            categoryIconId: Number(updatedCategoryIconId)
        }

        console.log(data);

        await updateCategoryApi(category.categoryId, data)
        onCategoryAdded();
        return;
    }

    useEffect(() => {
        console.log(updatedCategoryIconId);
        
    }, [updatedCategoryIconId])

    function handleIconClick(iconId: number){
        setUpdateCategoryIconId(String(iconId));
    }

    return (
        <Drawer
            open={open}
            onOpenChange={onOpenChange}
            showSwipeHandle={isMobile}
            swipeDirection={swipeDirection}
        >
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>
                        Category Details
                    </DrawerTitle>

                    <DrawerDescription>
                        {category
                            ? `Category ID: ${category.categoryId}`
                            : ""}
                    </DrawerDescription>
                </DrawerHeader>

                <div className="flex-1 p-6">
                    { category && (
                        
                        <div className="space-y-4">
                            {/* Category */}
                            <div>
                                <p className="mb-1">Category:</p>

                                <Input
                                    value={updatedCategoryName}
                                    onChange={(e) =>
                                        setUpdateCategoryName(e.target.value)
                                    }
                                />
                            </div>

                            <div >
                                <p className="mb-1">Icon <CategoryIcons iconId={Number(updatedCategoryIconId)} /></p><br />

                                <CategoryIcons
                                    size={30}
                                    onSelect={(iconId) => {
                                     handleIconClick(iconId)
                                    }}
                                />
                            </div>

                        </div>  
                    )}
                </div>

                <DrawerFooter className="flex flex-row">
                    <DrawerClose>
                        <Button variant="outline">
                            Close
                        </Button>
                    </DrawerClose>

                    <DrawerClose>
                        <Button onClick={handleSaveButton}>
                            Save
                        </Button>
                    </DrawerClose>
                    
                </DrawerFooter>

            </DrawerContent>

        </Drawer>
    )
}

export default updateCategory;
