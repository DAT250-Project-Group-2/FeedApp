package no.hvl.dat250.jpa.basicexample;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class Poll {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private String id;
}
