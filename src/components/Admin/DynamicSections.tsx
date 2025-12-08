import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  GripVertical, 
  Trash2, 
  Edit3, 
  Eye, 
  EyeOff,
  Upload,
  X,
  Move,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { BlogSection, blogApiService } from '@/services/blogApi';
import { useToast } from '@/hooks/use-toast';

interface DynamicSectionsProps {
  sections: BlogSection[];
  onSectionsChange: (sections: BlogSection[]) => void;
  isEditMode?: boolean;
}

const DynamicSections: React.FC<DynamicSectionsProps> = ({
  sections,
  onSectionsChange,
  isEditMode = true
}) => {
  const { toast } = useToast();
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

  // Create a new section
  const handleAddSection = () => {
    const newSection: BlogSection = {
      sectionTitle: '',
      sectionContent: '',
      sectionImage: '',
      order: sections.length
    };
    onSectionsChange([...sections, newSection]);
    setEditingSectionId(newSection.sectionTitle + Date.now()); // Use unique ID
  };

  // Update a section
  const handleUpdateSection = (index: number, field: keyof BlogSection, value: string) => {
    const updatedSections = [...sections];
    updatedSections[index] = {
      ...updatedSections[index],
      [field]: value
    };
    onSectionsChange(updatedSections);
  };

  // Delete a section
  const handleDeleteSection = (index: number) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    // Reorder remaining sections
    const reorderedSections = updatedSections.map((section, i) => ({
      ...section,
      order: i
    }));
    onSectionsChange(reorderedSections);
    if (editingSectionId === sections[index].sectionTitle + index) {
      setEditingSectionId(null);
    }
  };

  // Drag and drop functionality
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItemIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedItemIndex === null || draggedItemIndex === dropIndex) {
      return;
    }

    const newSections = [...sections];
    const draggedItem = newSections[draggedItemIndex];
    
    // Remove the dragged item
    newSections.splice(draggedItemIndex, 1);
    
    // Insert at new position
    newSections.splice(dropIndex, 0, draggedItem);
    
    // Update order numbers
    const reorderedSections = newSections.map((section, i) => ({
      ...section,
      order: i
    }));
    
    onSectionsChange(reorderedSections);
    setDraggedItemIndex(null);
  };

  // Move section up or down (alternative to drag and drop)
  const moveSection = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= sections.length) {
      return;
    }

    const newSections = [...sections];
    [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
    
    // Update order numbers
    const reorderedSections = newSections.map((section, i) => ({
      ...section,
      order: i
    }));
    
    onSectionsChange(reorderedSections);
  };

  // Image upload handler
  const handleImageUpload = async (index: number, file: File) => {
    try {
      const response = await blogApiService.uploadImage(file);
      const imageUrl = response.data.url;
      handleUpdateSection(index, 'sectionImage', imageUrl);
      toast({
        title: "Image uploaded",
        description: "Section image uploaded successfully",
      });
    } catch (error) {
      console.error('Image upload error:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive"
      });
    }
  };

  const ImageUpload = ({ index, section }: { index: number; section: BlogSection }) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(section.sectionImage || null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        await handleImageUpload(index, file);
        setPreviewUrl(URL.createObjectURL(file));
      }
    };

    return (
      <div className="space-y-2">
        <Label>Section Image</Label>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              handleUpdateSection(index, 'sectionImage', '');
              setPreviewUrl(null);
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {previewUrl && (
          <div className="relative">
            <img
              src={previewUrl}
              alt="Section preview"
              className="w-full h-32 object-cover rounded-lg border"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => {
                handleUpdateSection(index, 'sectionImage', '');
                setPreviewUrl(null);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Dynamic Sections</CardTitle>
            <p className="text-sm text-muted-foreground">
              Add and manage content sections for your blog post
            </p>
          </div>
          <Button
            type="button"
            onClick={handleAddSection}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Section
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {sections.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="mb-4">No sections added yet.</p>
            <Button onClick={handleAddSection} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Section
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {sections.map((section, index) => (
              <div
                key={index}
                draggable={isEditMode}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                className={`relative group ${
                  draggedItemIndex === index ? 'opacity-50' : ''
                } ${
                  isEditMode ? 'cursor-move' : ''
                }`}
              >
                <Card className="transition-all duration-200 hover:shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {isEditMode && (
                          <div className="flex flex-col gap-1">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => moveSection(index, 'up')}
                              disabled={index === 0}
                            >
                              <ChevronUp className="h-3 w-3" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => moveSection(index, 'down')}
                              disabled={index === sections.length - 1}
                            >
                              <ChevronDown className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                        <GripVertical className="h-4 w-4 text-muted-foreground" />
                        <Badge variant="outline" className="text-xs">
                          Section {index + 1}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingSectionId(
                            editingSectionId === (section.sectionTitle + index) ? null : (section.sectionTitle + index)
                          )}
                        >
                          {editingSectionId === (section.sectionTitle + index) ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Edit3 className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteSection(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {editingSectionId === (section.sectionTitle + index) || !isEditMode ? (
                      <div className="space-y-4">
                        <div>
                          <Label>Section Title</Label>
                          <Input
                            value={section.sectionTitle}
                            onChange={(e) => handleUpdateSection(index, 'sectionTitle', e.target.value)}
                            placeholder="Enter section title"
                          />
                        </div>
                        
                        <div>
                          <Label>Section Content</Label>
                          <Textarea
                            value={section.sectionContent}
                            onChange={(e) => handleUpdateSection(index, 'sectionContent', e.target.value)}
                            placeholder="Enter section content"
                            className="min-h-[100px]"
                          />
                        </div>
                        
                        <ImageUpload index={index} section={section} />
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <h3 className="font-semibold text-lg">{section.sectionTitle}</h3>
                        <div className="prose prose-sm max-w-none">
                          <p className="text-muted-foreground whitespace-pre-wrap">
                            {section.sectionContent || 'No content added yet.'}
                          </p>
                        </div>
                        {section.sectionImage && (
                          <div className="mt-4">
                            <img
                              src={section.sectionImage}
                              alt={section.sectionTitle}
                              className="w-full max-w-md h-48 object-cover rounded-lg border"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}
        
        {sections.length > 0 && (
          <div className="text-center pt-4 border-t">
            <p className="text-sm text-muted-foreground mb-3">
              Use the arrow buttons or drag and drop to reorder sections
            </p>
            <Button
              type="button"
              onClick={handleAddSection}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Another Section
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DynamicSections;