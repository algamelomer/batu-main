<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Department>
 */
class DetailFactory extends Factory
{

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        // Define your data arrays
        $activities = [
            [
                'title' => 'testing',
                'description' => 'this is description testing',
                'image' => 'http://127.0.0.1:8000/assets/images/testing.png',
                'counter_number' => null,
                'category' => 'activity',
            ],
            [
                'title' => 'activity years',
                'description' => 'this is description testing',
                'image' => 'http://127.0.0.1:8000/assets/images/activity years.png',
                'counter_number' => null,
                'category' => 'activity',
            ],
            [
                'title' => 'activity testing',
                'description' => 'this is description testing',
                'image' => 'http://127.0.0.1:8000/assets/images/activity testing.png',
                'counter_number' => null,
                'category' => 'activity',
            ],
        ];

        $counters = [
            [
                'title' => 'testing counter',
                'description' => 'this is description testing',
                'image' => 'http://127.0.0.1:8000/assets/images/testing counter.png',
                'counter_number' => 2000,
                'category' => 'counter',
            ],
            [
                'title' => 'testing two',
                'description' => 'this is description testing',
                'image' => 'http://127.0.0.1:8000/assets/images/testing two.png',
                'counter_number' => 2000,
                'category' => 'counter',
            ],
            [
                'title' => 'counter studint',
                'description' => 'this is description testing',
                'image' => 'http://127.0.0.1:8000/assets/images/counter studint.png',
                'counter_number' => 1200,
                'category' => 'counter',
            ],
            [
                'title' => 'counter faculty',
                'description' => 'this is description testing',
                'image' => 'http://127.0.0.1:8000/assets/images/counter faculty.png',
                'counter_number' => 4,
                'category' => 'counter',
            ],
            [
                'title' => 'counter department',
                'description' => 'this is description testing',
                'image' => 'http://127.0.0.1:8000/assets/images/counter department.png',
                'counter_number' => 22,
                'category' => 'counter',
            ],
            [
                'title' => 'counter years',
                'description' => 'this is description testing',
                'image' => 'http://127.0.0.1:8000/assets/images/counter years.png',
                'counter_number' => 7,
                'category' => 'counter',
            ],
        ];

        // Choose random data from the arrays
        $data = $this->faker->randomElement([$activities, $counters]);

        // Get random item
        $randomDetail = $this->faker->randomElement($data);

        return [
            'title' => $randomDetail['title'],
            'description' => $randomDetail['description'],
            'image' => $randomDetail['image'],
            'counter_number' => $randomDetail['counter_number'],
            'category' => $randomDetail['category'],
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
