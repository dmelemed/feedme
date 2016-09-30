package com.feedme.repository;

import com.feedme.domain.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Recipe entity.
 */
@SuppressWarnings("unused")
public interface RecipeRepository extends JpaRepository<Recipe,Long> {

}
