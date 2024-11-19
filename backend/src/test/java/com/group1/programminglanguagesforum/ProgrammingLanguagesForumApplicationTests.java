//package com.group1.programminglanguagesforum;
//
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.web.servlet.MockMvc;
//
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@SpringBootTest
//@AutoConfigureMockMvc
//class ProgrammingLanguagesForumApplicationTests {
//
//	@Autowired
//	private MockMvc mockMvc;
//
//	@Test
//	void contextLoads() {
//	}
//
//	@Test
//	void testSetUp() throws Exception {
//		mockMvc.perform(get("/api/v1/test"))
//				.andExpect(status().isOk())
//				.andExpect(content().string("test"));
//	}
//
//}
