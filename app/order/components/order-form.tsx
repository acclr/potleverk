"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Upload, Package, MapPin, FileText, X, File, Image as ImageIcon } from "lucide-react"
import { useLocale } from "@/features/translations/translations-context";


interface OrderFormProps {
  subject: string;
  setSubject: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  isPickup: boolean;
  setIsPickup: (value: boolean) => void;
  files: File[];
  setFiles: (files: File[]) => void;
  onSubmit: (e: React.FormEvent) => void;
  uploading?: boolean;
  // Address fields
  address?: string;
  setAddress?: (value: string) => void;
  postalCode?: string;
  setPostalCode?: (value: string) => void;
  city?: string;
  setCity?: (value: string) => void;
  country?: string;
  setCountry?: (value: string) => void;
  instructions?: string;
  setInstructions?: (value: string) => void;
}

export function OrderForm({
  subject,
  setSubject,
  description,
  setDescription,
  isPickup,
  setIsPickup,
  files,
  setFiles,
  onSubmit,
  uploading = false,
  address = "",
  setAddress = () => { },
  postalCode = "",
  setPostalCode = () => { },
  city = "",
  setCity = () => { },
  country = "",
  setCountry = () => { },
  instructions = "",
  setInstructions = () => { }
}: OrderFormProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const t = useLocale();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || [])
    setFiles([...files, ...newFiles])
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    setFiles([...files, ...droppedFiles])
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <ImageIcon className="h-4 w-4" />
    }
    return <File className="h-4 w-4" />
  }

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-3xl lg:text-2xl font-semibold">{t["order.yourOrder"]}</h1>
        <p>{t["order.fillRequirements"]}</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <Card className="cursor-default rounded-xl">
          <CardHeader className="!p-4 !pb-2">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-secondary-950 rounded-full flex items-center justify-center p-1.5">
                <Package size={20} color="white" />
              </div>
              <CardTitle className="font-[600] text-[18px] md:text-[16px]">
                {t["order.orderDetails"]}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="!p-4 !pt-0 space-y-4">
            <p className="md:text-[13px] text-gray-600">{t["order.requestDesc"]}</p>
            <div className="space-y-2">
              <Label htmlFor="order-title" className="text-sm font-medium">
                {t["order.wish"]}
              </Label>
              <Input
                id="order-title"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                placeholder={t["order.wish"]}
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="order-description" className="text-sm font-medium">
                {t["order.describeOrder"]}
              </Label>
              <Textarea
                id="order-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t["order.describeOrder"]}
                className="min-h-[120px] text-base resize-none"
                rows={5}
              />
            </div>
          </CardContent>
        </Card>

        {/* Attachments Section */}
        <Card className="cursor-default rounded-xl">
          <CardHeader className="!p-4 !pb-2">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-secondary-950 rounded-full flex items-center justify-center p-1.5">
                <FileText size={20} color="white" />
              </div>
              <CardTitle className="font-[600] text-[18px] md:text-[16px]">
                {t["dashboard.attachments"]}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="!p-4 !pt-0 space-y-4">
            <p className="md:text-[13px] text-gray-600">{t["order.uploadFiles"]}</p>
            {/* Drag and Drop Area */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`
                relative border-2 border-dashed rounded-lg p-8 text-center transition-all
                ${isDragging
                  ? 'border-primary bg-primary/5 scale-[1.02]'
                  : 'border-gray-300 hover:border-gray-400 bg-gray-50/50'
                }
              `}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className={`
                    p-3 rounded-full transition-colors
                    ${isDragging ? 'bg-primary/20' : 'bg-gray-100'}
                  `}>
                    <Upload className={`
                      h-6 w-6 transition-colors
                      ${isDragging ? 'text-primary' : 'text-gray-600'}
                    `} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-700">
                      {isDragging ? t["order.dropFiles"] : t["order.clickOrDrag"]}
                    </p>
                    <p className="text-xs text-gray-500">
                      {t["order.allowedFormats"]}
                    </p>
                  </div>
                </div>
              </label>
            </div>

            {/* Files List */}
            {files.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">{t["order.uploadedFiles"]} ({files.length})</Label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="flex-shrink-0 text-gray-500">
                          {getFileIcon(file)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-700 truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="flex-shrink-0 p-1 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Remove file"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pickup Option */}
        <Card className="cursor-default rounded-xl">
          <CardContent className="!p-4">
            <div className="flex items-center gap-3">
              <Switch
                id="pickup-self"
                checked={isPickup}
                onCheckedChange={setIsPickup}
              />
              <div className="space-y-0.5">
                <Label htmlFor="pickup-self" className="text-base font-medium cursor-pointer">
                  {t["order.pickupLabel"]}
                </Label>
                <p className="md:text-[13px] text-muted-foreground">{t["order.pickupText"]}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Address Section */}
        {!isPickup && (
          <Card className="cursor-default rounded-xl">
            <CardHeader className="!p-4 !pb-2">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-secondary-950 rounded-full flex items-center justify-center p-1.5">
                  <MapPin size={20} color="white" />
                </div>
                <CardTitle className="font-[600] text-[18px] md:text-[16px]">
                  {t["order.deliveryAddressLabel"]}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="!p-4 !pt-0 space-y-4">
              <p className="md:text-[13px] text-gray-600">{t["order.deliveryAddressText"]}</p>
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-medium">
                  {t["order.address"]}
                </Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Adresse"
                  className="text-base"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postal-code" className="text-sm font-medium">
                    {t["order.postalCode"]}
                  </Label>
                  <Input
                    id="postal-code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="Postnummer"
                    className="text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm font-medium">
                    {t["order.city"]}
                  </Label>
                  <Input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder={t["order.city"]}
                    className="text-base"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="text-sm font-medium">
                  {t["order.country"]}
                </Label>
                <Input
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder={t["order.country"]}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions" className="text-sm font-medium">
                  {t["order.instructionsLabel"]}
                </Label>
                <Textarea
                  id="instructions"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder={t["order.instructionsPlaceholder"]}
                  className="min-h-20 text-base resize-none"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            size="lg"
            className="w-full text-lg"
            disabled={uploading}
          >
            {uploading ? t["order.sending"] : t["order.sendOrder"]}
          </Button>
        </div>
      </form>
    </div>
  )
}