package ru.solidtech.website;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import ru.solidtech.website.controller.FPSBuildController;
import ru.solidtech.website.dto.GameFPSCountDTO;
import ru.solidtech.website.model.FPSBuild;
import ru.solidtech.website.service.FPSBuildService;

import java.util.Arrays;

import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(FPSBuildController.class)
public class FPSBuildControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@Mock
	private FPSBuildService fpsBuildService;

	@InjectMocks
	private FPSBuildController fpsBuildController;

	private ObjectMapper objectMapper;

	@BeforeEach
	public void setUp() {
		objectMapper = new ObjectMapper();
	}

	@Test
	public void createFPSBuild_ShouldReturnCreated() throws Exception {
		GameFPSCountDTO dto1 = new GameFPSCountDTO();
		dto1.setGameId(1L);
		dto1.setFpsCount(60);
		dto1.setSettings("Высокие");
		dto1.setResolution("1920x1080");
		dto1.setTechnology("DLSS");
		dto1.setFrameGeneration(true);

		GameFPSCountDTO dto2 = new GameFPSCountDTO();
		dto2.setGameId(2L);
		dto2.setFpsCount(75);
		dto2.setSettings("Средние");
		dto2.setResolution("2560x1440");
		dto2.setTechnology("FSR");
		dto2.setFrameGeneration(false);

		// Настройка поведения мока
		when(fpsBuildService.createFPSBuild(anyList())).thenReturn(new FPSBuild());

		mockMvc.perform(post("/api/v1/fpsbuild")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(Arrays.asList(dto1, dto2))))
				.andExpect(status().isCreated());
	}
}
