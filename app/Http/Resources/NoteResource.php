<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class NoteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'subjectId' => $this->subject->id,
            'subject' => $this->subject->name,
            'description' => $this->description,
            'published' => $this->created_at->format('d F, Y'),
            'link' => route('note.show', $this->slug)
        ];
    }
}
