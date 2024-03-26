<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StudyPlan>
 */
class StudyPlanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $years = ['first', 'second', 'third', 'fourth'];
        $semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];

        return [
            'name' => $this->faker->word,
            'description' => $this->faker->paragraph,
            'Lecturer' => $this->faker->name,
            'academic_year' => $this->faker->randomElement($years) . ' year',
            'semester' => $this->faker->randomElement($semesters),
            'credits' => $this->faker->numberBetween(1, 5),
            'user_id' => $this->faker->numberBetween(1,10),
            'department_id' =>  $this->faker->numberBetween(1, 6),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
