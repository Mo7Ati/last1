<?php


namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;

class HomePageSectionsController extends Controller
{
    public function index()
    {
        $sections = Section::all();
        return successResponse($sections, 'Home page sections fetched successfully');
    }
}
