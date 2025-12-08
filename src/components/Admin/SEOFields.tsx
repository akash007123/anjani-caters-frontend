import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';
import { useState } from 'react';

interface SEOFieldsProps {
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  onSeoTitleChange: (value: string) => void;
  onSeoDescriptionChange: (value: string) => void;
  onSeoKeywordsChange: (keywords: string[]) => void;
}

const SEOFields: React.FC<SEOFieldsProps> = ({
  seoTitle,
  seoDescription,
  seoKeywords,
  onSeoTitleChange,
  onSeoDescriptionChange,
  onSeoKeywordsChange
}) => {
  const [newKeyword, setNewKeyword] = useState('');

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !seoKeywords.includes(newKeyword.trim())) {
      onSeoKeywordsChange([...seoKeywords, newKeyword.trim()]);
      setNewKeyword('');
    }
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    onSeoKeywordsChange(seoKeywords.filter(keyword => keyword !== keywordToRemove));
  };

  const handleKeywordKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">SEO Settings</CardTitle>
        <p className="text-sm text-muted-foreground">
          Optimize your blog for search engines
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Meta Title */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="seoTitle" className="text-sm font-medium">
              Meta Title
            </Label>
            <span className={`text-xs ${seoTitle.length > 60 ? 'text-red-500' : 'text-muted-foreground'}`}>
              {seoTitle.length}/60
            </span>
          </div>
          <Input
            id="seoTitle"
            value={seoTitle}
            onChange={(e) => onSeoTitleChange(e.target.value)}
            placeholder="Enter SEO title (recommended: 50-60 characters)"
            maxLength={60}
            className={seoTitle.length > 60 ? 'border-red-500 focus:border-red-500' : ''}
          />
          {seoTitle.length > 60 && (
            <p className="text-xs text-red-500">
              Meta title should be 60 characters or less for better display in search results
            </p>
          )}
        </div>

        {/* Meta Description */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="seoDescription" className="text-sm font-medium">
              Meta Description
            </Label>
            <span className={`text-xs ${seoDescription.length > 160 ? 'text-red-500' : 'text-muted-foreground'}`}>
              {seoDescription.length}/160
            </span>
          </div>
          <Textarea
            id="seoDescription"
            value={seoDescription}
            onChange={(e) => onSeoDescriptionChange(e.target.value)}
            placeholder="Enter SEO description (recommended: 150-160 characters)"
            maxLength={160}
            className={`min-h-[80px] resize-none ${seoDescription.length > 160 ? 'border-red-500 focus:border-red-500' : ''}`}
          />
          {seoDescription.length > 160 && (
            <p className="text-xs text-red-500">
              Meta description should be 160 characters or less for better display in search results
            </p>
          )}
        </div>

        {/* SEO Keywords */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">SEO Keywords</Label>
          
          {/* Add Keyword Input */}
          <div className="flex gap-2">
            <Input
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyPress={handleKeywordKeyPress}
              placeholder="Enter a keyword and press Enter"
              className="flex-1"
            />
            <Button
              type="button"
              onClick={handleAddKeyword}
              variant="outline"
              size="sm"
              disabled={!newKeyword.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Keywords Display */}
          {seoKeywords.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Current keywords:</p>
              <div className="flex flex-wrap gap-2">
                {seoKeywords.map((keyword, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="pr-1 pl-2 py-1 text-xs"
                  >
                    {keyword}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-auto p-0 w-4 hover:bg-transparent"
                      onClick={() => handleRemoveKeyword(keyword)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* SEO Tips */}
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
              SEO Tips:
            </h4>
            <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Use relevant keywords that match your content</li>
              <li>• Keep meta title between 50-60 characters</li>
              <li>• Keep meta description between 150-160 characters</li>
              <li>• Use 3-5 focused keywords for better targeting</li>
              <li>• Avoid keyword stuffing</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SEOFields;