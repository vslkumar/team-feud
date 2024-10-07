package com.practice;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

public class TeamDistributor {
    public static void main(String[] args) {
        int numberOfTeams = 2; // N - Total teams

        List<String> members = new ArrayList<>();
        members.add("Alice");
        members.add("Bob");
        members.add("Charlie");
        members.add("David");
        members.add("Eve");
        members.add("Frank");
        members.add("Grace");
        members.add("Hank");
        members.add("Ivy");
        members.add("Jack");
        members.add("Kathy");
        members.add("Liam");
        members.add("Mia");
        members.add("Nina");
        members.add("Oscar");
        members.add("Paul");
        members.add("Quincy");
        members.add("Rita");
        members.add("Steve");
        members.add("Tina");

        distributeTeams(numberOfTeams, members);
    }

    public static void distributeTeams(int numberOfTeams, List<String> members) {
        Collections.shuffle(members); // Shuffle members randomly

        List<List<String>> teams = new ArrayList<>();
        for (int i = 0; i < numberOfTeams; i++) {
            teams.add(new ArrayList<>());
        }

        // Distribute members to teams
        for (int i = 0; i < members.size(); i++) {
            teams.get(i % numberOfTeams).add(members.get(i));
        }

        Random random = new Random();
        // Assign captains and display teams
        for (int i = 0; i < teams.size(); i++) {
            List<String> team = teams.get(i);
            if (!team.isEmpty()) {
                int captainIndex = random.nextInt(team.size());
                String captain = team.get(captainIndex);
                System.out.println("Team " + (i + 1) + ": " + team);
                System.out.println("Captain: " + captain);
                System.out.println();
            }
        }
    }
}